import type { BankData } from "../../types";
import type { LocalizedText } from "@/i18n/types";
import { L, calendar } from "./helpers";

/*
 * NOVA (roteiro 5.6), em rublos. O roteiro traz só o dia; os horários são valores menores adicionados para o layout
 * e escolhidos para não colidir com a Localização, com as fotos e com as mensagens (ex.: galochas pagas antes da foto
 * de 05 Dez às 09:30; banhos pagos durante a visita de 12 Dez).
 * "Crédito" = compra no cartão (saída). "Assinatura Matches Premium (cortesia A. Simanovich)" foi lançada como saída.
 * O saldo não consta no roteiro: é a soma líquida dos lançamentos listados.
 */
const tx = (id: string, time: string, merchant: LocalizedText, amount: number, method: LocalizedText, category?: LocalizedText) => ({ id, time, merchant, amount, method, category });

export const bank: BankData = {
  brand: "NOVA",
  holder: "Grigori Rasputin",
  currency: "RUB",
  balance: 5861.1,
  days: [
    { id: "b-01nov", label: calendar("01 NOV"), transactions: [tx("t01", "08:00", L("Aluguel Gorokhovaya, 64", "Rent — Gorokhovaya 64", "Alquiler — Gorokhovaya 64"), -400, L("Débito automático", "Direct debit", "Débito automático"), L("Moradia", "Housing", "Vivienda"))] },
    { id: "b-05nov", label: calendar("05 NOV"), transactions: [tx("t02", "11:30", L("Empório Eliseev — Vinho Madeira e doces", "Eliseev Grocery — Madeira wine and sweets", "Tienda Eliseev — vino de Madeira y dulces"), -186, "PIX")] },
    { id: "b-14nov", label: calendar("14 NOV"), transactions: [tx("t03", "10:40", L("Orfanato São Nicolau — Doação", "St. Nicholas Orphanage — Donation", "Orfanato San Nicolás — Donación"), -300, "PIX")] },
    { id: "b-15nov", label: calendar("15 NOV"), transactions: [tx("t04", "10:15", L("Farmácia do Dr. Badmaev — Ervas e bicarbonato de sódio", "Dr. Badmaev's Pharmacy — Herbs and baking soda", "Farmacia del Dr. Badmaev — Hierbas y bicarbonato de sodio"), -42, "PIX")] },
    { id: "b-23nov", label: calendar("23 NOV"), transactions: [tx("t05", "10:00", L("Peticionários via A. Simanovich — Donativos", "Petitioners via A. Simanovich — Donations", "Peticionarios vía A. Simanovich — Donativos"), 2500, L("Entrada", "Deposit", "Ingreso"))] },
    { id: "b-29nov", label: calendar("29 NOV"), transactions: [tx("t06", "14:00", L("Casa Bancária Rubin & Filhos — “Consultoria”", "Rubin & Sons Bank — “Consulting”", "Casa Bancaria Rubin e Hijos — «Consultoría»"), 5000, L("Entrada", "Deposit", "Ingreso"))] },
    { id: "b-05dez", label: calendar("05 DEZ"), transactions: [tx("t07", "08:40", L("Casa Triângulo — Galochas de borracha", "Triangle Shoe Shop — Rubber galoshes", "Tienda Triángulo — Botas de goma"), -18, L("Crédito", "Credit", "Crédito"))] },
    { id: "b-09dez", label: calendar("09 DEZ"), transactions: [tx("t08", "12:20", L("Assinatura Matches Premium (cortesia A. Simanovich)", "Matches Premium subscription (compliments of A. Simanovich)", "Suscripción a Matches Premium (cortesía de A. Simanovich)"), -9.9, L("Crédito", "Credit", "Crédito"), L("Assinatura", "Subscription", "Suscripción"))] },
    { id: "b-12dez", label: calendar("12 DEZ"), transactions: [tx("t09", "14:45", L("Casas de Banho Públicas", "Public Baths", "Baños Públicos"), -5, "PIX")] },
    { id: "b-14dez", label: calendar("14 DEZ"), transactions: [tx("t10", "19:20", "Praskovya Rasputina (Pokrovskoye)", -600, "PIX")] },
    { id: "b-15dez", label: calendar("15 DEZ"), transactions: [tx("t11", "10:50", L("Padaria Filippov — Mel e pães", "Filippov Bakery — Honey and bread", "Panadería Filippov — Miel y panes"), -14, L("Crédito", "Credit", "Crédito"))] },
    {
      id: "b-16dez",
      label: calendar("16 DEZ"),
      transactions: [
        {
          ...tx("t12", "12:10", L("Estrada de Ferro — Passagem Petrogrado → Tiumen, 7 de janeiro, 2 lugares", "Railway — Petrograd → Tyumen ticket, January 7, 2 seats", "Ferrocarril — Billete Petrogrado → Tiumén, 7 de enero, 2 plazas"), -64, L("Crédito", "Credit", "Crédito")),
          lock: { passcode: "2906", hint: L("As senhas são datas ou anos que Rasputin guardou nas Notas e em outros aplicativos.", "Passcodes are dates or years Rasputin saved in Notes and other apps.", "Las claves son fechas o años que Rasputin guardó en Notas y otras aplicaciones.") },
        },
      ],
    },
  ],
};
