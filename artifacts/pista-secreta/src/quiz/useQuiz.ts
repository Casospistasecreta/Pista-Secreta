import { useCallback, useEffect, useRef, useState } from "react";
import { QUIZ_POPUP_DELAY_MS, QUIZ_SEEN_KEY } from "./quizConfig";
import { quizTrack, type QuizSource } from "./quizAnalytics";

let memorySeen = false;

function wasSeen() {
  try {
    return memorySeen || window.sessionStorage.getItem(QUIZ_SEEN_KEY) === "1";
  } catch {
    return memorySeen;
  }
}

function markSeen() {
  memorySeen = true;
  try {
    window.sessionStorage.setItem(QUIZ_SEEN_KEY, "1");
  } catch {
    // The in-memory flag still prevents another automatic popup in this page session.
  }
}

/** Shares one modal between the landing CTA and a once-per-session automatic popup. */
export function useQuiz() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<QuizSource>("cta");
  const openRef = useRef(open);
  openRef.current = open;

  const openFromCta = useCallback(() => {
    markSeen();
    setSource("cta");
    setOpen(true);
    quizTrack.openCta();
  }, []);

  useEffect(() => {
    if (wasSeen()) return;
    let retries = 0;
    let timer: number;

    const attempt = () => {
      if (wasSeen() || openRef.current) return;
      const activeElement = document.activeElement;
      const isTyping =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement?.getAttribute("contenteditable") === "true";
      const anotherDialogIsOpen = !!document.querySelector('[role="dialog"]');

      if ((isTyping || anotherDialogIsOpen) && retries < 3) {
        retries += 1;
        timer = window.setTimeout(attempt, 4000);
        return;
      }
      if (isTyping || anotherDialogIsOpen) return;

      markSeen();
      setSource("popup");
      setOpen(true);
      quizTrack.popupImpression();
    };

    timer = window.setTimeout(attempt, QUIZ_POPUP_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return { open, source, setOpen, openFromCta };
}
