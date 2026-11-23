import type { CallsData } from "../../types";

/*
 * Chamadas e Correio de Voz (roteiro 5.10). App novo deste caso.
 * AJUSTE: a ligação ao 911 (22:53) durava 2m10s no roteiro e terminaria às 22:55:10, depois do início da chamada ao
 * médico (22:55). Passou a 1m40s para as duas chamadas não se sobreporem.
 */
export const calls: CallsData = {
  recents: [
    { id: "k01", at: "08 MAI · 08:45", kind: "missed", name: "B. Bee", personId: "p-bbee", count: 5 },
    { id: "k02", at: "08 MAI · 07:30", kind: "missed", name: "Mamãe", personId: "p-mamae", count: 2 },
    { id: "k03", at: "08 MAI · 00:40", kind: "missed", name: "David Brawl", personId: "p-david", count: 3 },
    { id: "k04", at: "07 MAI · 22:55", kind: "outgoing", name: "Dr. Stitch", personId: "p-stitch", duration: "0m22s" },
    { id: "k05", at: "07 MAI · 22:53", kind: "outgoing", name: "Emergência 911", duration: "1m40s" },
    { id: "k06", at: "07 MAI · 22:20", kind: "missed", name: "David Brawl", personId: "p-david" },
    { id: "k07", at: "07 MAI · 21:35", kind: "outgoing", name: "Mamãe", personId: "p-mamae", duration: "4m18s" },
    { id: "k08", at: "06 MAI · 18:50", kind: "received", name: "Mamãe", personId: "p-mamae", duration: "1m20s" },
    { id: "k09", at: "03 MAI · 23:30", kind: "outgoing", name: "Katherine Hate", personId: "p-katherine", duration: "0m45s" },
  ],
  voicemails: [
    { id: "v01", at: "08 MAI · 10:02", name: "B. Bee", personId: "p-bbee", duration: "0m15s", transcript: "Quem lacrou o caixão? Onde está o corpo? Eu mato quem fez isso." },
    { id: "v02", at: "08 MAI · 09:15", name: "Mamãe", personId: "p-mamae", duration: "0m40s", transcript: "Filho... a vizinha disse... Me liga, por favor." },
    { id: "v03", at: "07 MAI · 22:10", name: "Katherine Hate", personId: "p-katherine", duration: "0m28s", transcript: "Atende... tô na estrada. Não quis dizer aquilo. Eu te amo, tá? Me liga." },
  ],
};
