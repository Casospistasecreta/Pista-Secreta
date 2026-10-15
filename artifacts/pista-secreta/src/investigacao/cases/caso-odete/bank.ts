import type { BankData } from "../../types";

/*
 * Extrato em ordem cronológica. O roteiro traz só a data (exceto as pensões, às
 * 10:00); os horários abaixo são valores menores adicionados para o layout e
 * foram escolhidos para não colidir com a Localização (ex.: costureira Carmello
 * 09:13–09:48 em 20/nov; Júnior Veículos 13:04–15:12 em 22/dez).
 */
const tx = (
  id: string,
  time: string,
  merchant: string,
  amount: number,
  method: string,
  category?: string,
) => ({ id, time, merchant, amount, method, category });

export const bank: BankData = {
  brand: "NOVA",
  holder: "Odete de Jesus",
  balance: 0.03,
  days: [
    { id: "b-10nov", label: "10 NOV", transactions: [tx("t01", "08:12", "Revista de Ufologia — assinatura mensal", -74.9, "Crédito", "Assinatura")] },
    {
      id: "b-15nov",
      label: "15 NOV",
      transactions: [
        tx("t02", "08:47", "Barraca do Melão", -23.5, "PIX", "Frutas e Verduras"),
        tx("t03", "09:20", "Barraca Segredos de Vitória", -370, "PIX"),
        tx("t04", "10:31", "Mercado Extra", -534.44, "Crédito"),
      ],
    },
    { id: "b-18nov", label: "18 NOV", transactions: [tx("t05", "14:05", "Sebastião Silva Borges", -800, "PIX")] },
    {
      id: "b-20nov",
      label: "20 NOV",
      transactions: [
        tx("t06", "09:31", "Adriele Carmello dos Santos", -71, "PIX"),
        tx("t07", "12:40", "FamilySearch — assinatura digital", -36.5, "Crédito", "Assinatura"),
      ],
    },
    { id: "b-23nov", label: "23 NOV", transactions: [tx("t08", "10:00", "Pensão mensal — Ações da Empresa de Transporte Firmino Ltda.", 2500, "Adicionado", "Pensão")] },
    { id: "b-10dez", label: "10 DEZ", transactions: [tx("t09", "08:09", "Revista de Ufologia — assinatura mensal", -74.9, "Crédito", "Assinatura")] },
    {
      id: "b-12dez",
      label: "12 DEZ",
      transactions: [
        tx("t10", "09:44", "Pesqueiro Góis", -427.86, "PIX", "Milho e Grãos"),
        tx("t11", "15:18", "Construlago", -423, "Crédito (1 parcela)", "Equipamentos de construção"),
      ],
    },
    { id: "b-15dez", label: "15 DEZ", transactions: [tx("t12", "11:26", "Origami Papelaria", -578.3, "Débito")] },
    { id: "b-20dez", label: "20 DEZ", transactions: [tx("t13", "12:34", "FamilySearch — assinatura digital", -36.5, "Crédito", "Assinatura")] },
    { id: "b-22dez", label: "22 DEZ", transactions: [tx("t14", "13:40", "Júnior Veículos", -40600, "Débito", "Kawasaki Versys X 300")] },
    { id: "b-23dez", label: "23 DEZ", transactions: [tx("t15", "10:00", "Pensão mensal — Ações da Empresa de Transporte Firmino Ltda.", 2500, "Adicionado", "Pensão")] },
    { id: "b-10jan", label: "10 JAN", transactions: [tx("t16", "08:15", "Revista de Ufologia — assinatura mensal", -74.9, "Crédito", "Assinatura")] },
    {
      id: "b-16jan",
      label: "16 JAN",
      transactions: [
        {
          ...tx("t17", "15:41", "Aerovias Viagens", -8842, "Crédito", "Passagem de Avião — Bora Bora (PF)"),
          lock: { passcode: "1987" },
        },
      ],
    },
  ],
};
