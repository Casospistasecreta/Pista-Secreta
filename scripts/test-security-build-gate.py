#!/usr/bin/env python3
"""Verify production builds stop when the dependency audit finds a high alert."""

import os
import pathlib
import subprocess
import tempfile
import tomllib


ROOT = pathlib.Path(__file__).resolve().parents[1]
ARTIFACT_CONFIGS = (
    pathlib.Path("artifacts/api-server/.replit-artifact/artifact.toml"),
    pathlib.Path("artifacts/pista-secreta/.replit-artifact/artifact.toml"),
)
FAKE_PNPM = """#!/bin/sh
printf '%s\\n' "$*" >> "$PNPM_CALL_LOG"
if [ "$1" = "run" ] && [ "$2" = "security:audit" ]; then
  echo "simulated high severity vulnerability" >&2
  exit 1
fi
exit 0
"""


def production_build_command(config_path: pathlib.Path) -> str:
    with (ROOT / config_path).open("rb") as config_file:
        config = tomllib.load(config_file)

    production_services = [
        service for service in config["services"] if "production" in service
    ]
    if len(production_services) != 1:
        raise AssertionError(
            f"Expected one production service in {config_path}, got {len(production_services)}"
        )

    build = production_services[0]["production"]["build"]
    command_args = build["args"] if isinstance(build, dict) else build
    if command_args[:2] != ["sh", "-c"] or len(command_args) != 3:
        raise AssertionError(f"Unexpected production build command in {config_path}")
    return command_args[2]


def verify_audit_blocks_build(config_path: pathlib.Path) -> None:
    command = production_build_command(config_path)

    with tempfile.TemporaryDirectory(prefix="security-build-gate-") as temporary_dir:
        temporary_path = pathlib.Path(temporary_dir)
        fake_bin = temporary_path / "bin"
        fake_bin.mkdir()
        fake_pnpm = fake_bin / "pnpm"
        fake_pnpm.write_text(FAKE_PNPM, encoding="utf-8")
        fake_pnpm.chmod(0o755)
        call_log = temporary_path / "pnpm-calls.log"

        environment = os.environ.copy()
        environment["PATH"] = f"{fake_bin}{os.pathsep}{environment.get('PATH', '')}"
        environment["PNPM_CALL_LOG"] = str(call_log)

        result = subprocess.run(
            ["sh", "-c", command],
            cwd=ROOT,
            env=environment,
            capture_output=True,
            text=True,
            check=False,
        )

        if result.returncode == 0:
            raise AssertionError(
                f"{config_path}: production build unexpectedly succeeded after a high alert"
            )

        calls = call_log.read_text(encoding="utf-8").splitlines()
        if calls != ["run security:audit"]:
            raise AssertionError(
                f"{config_path}: expected only the audit call, got {calls!r}"
            )
        if "simulated high severity vulnerability" not in result.stderr:
            raise AssertionError(
                f"{config_path}: simulated high alert did not reach the build command"
            )

    print(f"PASS {config_path}: high audit alert blocks the production build")


def main() -> None:
    for artifact_config in ARTIFACT_CONFIGS:
        verify_audit_blocks_build(artifact_config)


if __name__ == "__main__":
    main()
