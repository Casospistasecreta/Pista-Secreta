import type { BankData } from "../../types";

/*
 * NOVA (roteiro 5.6), em rublos. O roteiro traz só o dia; os horários são valores menores adicionados para o layout
 * e escolhidos para não colidir com a Localização, com as fotos e com as mensagens (ex.: galochas pagas antes da foto
 * de 05 Dez às 09:30; banhos pagos durante a visita de 12 Dez).
 * "Crédito" = compra no cartão (saída). "Assinatura Matches Premium (cortesia A. Simanovich)" foi lançada como saída.
 * O saldo não consta no roteiro: é a soma líquida dos lançamentos listados.
 */
const tx = (id: string, time: string, merchant: string, amount: number, method: string, category?: string) => ({ id, time, merchant, amount, method, category });

export const bank: BankData = {
  brand: "NOVA",
  holder: "Grigori Rasputin",
  currency: "RUB",
  balance: 5861.1,
  days: [
    { id: "b-01nov", label: "01 NOV", transactions: [tx("t01", "08:00", "Aluguel Gorokhovaya, 64", -400, "Débito automático", "Moradia")] },
    { id: "b-05nov", label: "05 NOV", transactions: [tx("t02", "11:30", "Empório Eliseev — Vinho Madeira e doces", -186, "PIX")] },
    { id: "b-14nov", label: "14 NOV", transactions: [tx("t03", "10:40", "Orfanato São Nicolau — Doação", -300, "PIX")] },
    { id: "b-15nov", label: "15 NOV", transactions: [tx("t04", "10:15", "Farmácia do Dr. Badmaev — Ervas e bicarbonato de sódio", -42, "PIX")] },
    { id: "b-23nov", label: "23 NOV", transactions: [tx("t05", "10:00", "Peticionários via A. Simanovich — Donativos", 2500, "Entrada")] },
    { id: "b-29nov", label: "29 NOV", transactions: [tx("t06", "14:00", "Casa Bancária Rubin & Filhos — “Consultoria”", 5000, "Entrada")] },
    { id: "b-05dez", label: "05 DEZ", transactions: [tx("t07", "08:40", "Casa Triângulo — Galochas de borracha", -18, "Crédito")] },
    { id: "b-09dez", label: "09 DEZ", transactions: [tx("t08", "12:20", "Assinatura Matches Premium (cortesia A. Simanovich)", -9.9, "Crédito", "Assinatura")] },
    { id: "b-12dez", label: "12 DEZ", transactions: [tx("t09", "14:45", "Casas de Banho Públicas", -5, "PIX")] },
    { id: "b-14dez", label: "14 DEZ", transactions: [tx("t10", "19:20", "Praskovya Rasputina (Pokrovskoye)", -600, "PIX")] },
    { id: "b-15dez", label: "15 DEZ", transactions: [tx("t11", "10:50", "Padaria Filippov — Mel e pães", -14, "Crédito")] },
    {
      id: "b-16dez",
      label: "16 DEZ",
      transactions: [
        {
          ...tx("t12", "12:10", "Estrada de Ferro — Passagem Petrogrado → Tiumen, 7 de janeiro, 2 lugares", -64, "Crédito"),
          lock: { passcode: "2906", hint: "As senhas são datas ou anos que Rasputin guardou nas Notas e em outros aplicativos." },
        },
      ],
    },
  ],
};
