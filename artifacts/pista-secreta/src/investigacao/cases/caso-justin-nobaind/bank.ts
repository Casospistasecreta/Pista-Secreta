import type { BankData } from "../../types";

/*
 * NOVA (roteiro 5.8), em dólares. O roteiro traz só o dia; os horários são valores menores adicionados para o layout e
 * escolhidos para não colidir com Mensagens, Piklike e Localização (ex.: adiantamento às 09:58, logo antes da mensagem do
 * B. Bee das 10:00; doação às 14:40, antes do post do fundo às 15:00). O saldo não consta no roteiro: é um valor
 * plausível adicionado (troque se quiser). O adiantamento de US$ 250.000 é doado inteiro dois dias depois.
 */
const tx = (id: string, time: string, merchant: string, amount: number, method: string, category?: string) => ({ id, time, merchant, amount, method, category });

export const bank: BankData = {
  brand: "NOVA",
  holder: "Justin Nobaind",
  currency: "USD",
  balance: 83540.25,
  days: [
    { id: "b-28mar", label: "28 MAR", transactions: [tx("t01", "16:25", "Clínica Stitch — Consulta", -180, "Débito", "Saúde")] },
    { id: "b-04abr", label: "04 ABR", transactions: [tx("t02", "10:12", "Pacific Pulse — Assinatura anual", -60, "Débito", "Assinatura")] },
    { id: "b-24abr", label: "24 ABR", transactions: [tx("t03", "15:20", "Couro & Cia Alfaiataria — 2 jaquetas de couro sob medida, azul", -310, "Crédito", "Vestuário")] },
    {
      id: "b-02mai",
      label: "02 MAI",
      transactions: [
        tx("t04", "09:58", "Veludo Holdings — Adiantamento", 250000, "Entrada"),
        tx("t05", "11:30", "Casa Náutica Pelican — Tinta naval azul", -142, "Crédito"),
      ],
    },
    { id: "b-04mai", label: "04 MAI", transactions: [tx("t06", "14:40", "Fundo de Artistas Independentes — doação anônima", -250000, "Transferência")] },
    { id: "b-05mai", label: "05 MAI", transactions: [tx("t07", "16:20", "Brock — “serviços”", -380, "Débito")] },
    {
      id: "b-06mai",
      label: "06 MAI",
      transactions: [
        tx("t08", "11:05", "Floricultura Tulipa Azul — Flores para Dolores", -45, "Crédito"),
        {
          ...tx("t09", "13:40", "Marlin Azul Charters — Travessia San Pedro → Ensenada, 08 MAI, 02:00, 1 passageiro “J. Smith”", -18000, "Crédito"),
          lock: { passcode: "2208", hint: "O dia em que o Vidro Doce nasceu (dia e mês)." },
          details: [
            { label: "Destino", value: "Ensenada" },
            { label: "Saída", value: "08 MAI · 02:00" },
            { label: "Passageiro", value: "J. Smith" },
          ],
        },
      ],
    },
  ],
};
