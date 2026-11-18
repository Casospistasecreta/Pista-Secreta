import type { BankData } from "../../types";
import { L } from "./helpers";
import type { LocalizedText } from "@/i18n/types";

/*
 * Extrato em ordem cronológica. O roteiro traz só a data (exceto as pensões, às
 * 10:00); os horários abaixo são valores menores adicionados para o layout e
 * foram escolhidos para não colidir com a Localização (ex.: costureira Carmello
 * 09:13–09:48 em 20/nov; Júnior Veículos 13:04–15:12 em 22/dez).
 */
const tx = (
  id: string,
  time: string,
  merchant: LocalizedText,
  amount: number,
  method: LocalizedText,
  category?: LocalizedText,
) => ({ id, time, merchant, amount, method, category });

export const bank: BankData = {
  brand: "NOVA",
  holder: "Odete de Jesus",
  balance: 0.03,
  days: [
    { id: "b-10nov", label: L("10 NOV", "NOV 10", "10 NOV"), transactions: [tx("t01", "08:12", L("Revista de Ufologia — assinatura mensal", "UFO magazine — monthly subscription", "Revista de ufología — suscripción mensual"), -74.9, L("Crédito", "Credit", "Crédito"), L("Assinatura", "Subscription", "Suscripción"))] },
    {
      id: "b-15nov",
      label: L("15 NOV", "NOV 15", "15 NOV"),
      transactions: [
        tx("t02", "08:47", L("Barraca do Melão", "Melão Fruit Stall", "Puesto de frutas Melão"), -23.5, "PIX", L("Frutas e Verduras", "Produce", "Frutas y verduras")),
        tx("t03", "09:20", "Barraca Segredos de Vitória", -370, "PIX"),
        tx("t04", "10:31", "Mercado Extra", -534.44, "Crédito"),
      ],
    },
    { id: "b-18nov", label: L("18 NOV", "NOV 18", "18 NOV"), transactions: [tx("t05", "14:05", "Sebastião Silva Borges", -800, "PIX")] },
    {
      id: "b-20nov",
      label: L("20 NOV", "NOV 20", "20 NOV"),
      transactions: [
        tx("t06", "09:31", "Adriele Carmello dos Santos", -71, "PIX"),
        tx("t07", "12:40", L("FamilySearch — assinatura digital", "FamilySearch — digital subscription", "FamilySearch — suscripción digital"), -36.5, L("Crédito", "Credit", "Crédito"), L("Assinatura", "Subscription", "Suscripción")),
      ],
    },
    { id: "b-23nov", label: L("23 NOV", "NOV 23", "23 NOV"), transactions: [tx("t08", "10:00", L("Pensão mensal — Ações da Empresa de Transporte Firmino Ltda.", "Monthly pension — shares in Firmino Transport Ltd.", "Pensión mensual — acciones de Empresa de Transporte Firmino Ltda."), 2500, L("Adicionado", "Deposit", "Ingresado"), L("Pensão", "Pension", "Pensión"))] },
    { id: "b-10dez", label: L("10 DEZ", "DEC 10", "10 DIC"), transactions: [tx("t09", "08:09", L("Revista de Ufologia — assinatura mensal", "UFO magazine — monthly subscription", "Revista de ufología — suscripción mensual"), -74.9, L("Crédito", "Credit", "Crédito"), L("Assinatura", "Subscription", "Suscripción"))] },
    {
      id: "b-12dez",
      label: L("12 DEZ", "DEC 12", "12 DIC"),
      transactions: [
        tx("t10", "09:44", "Pesqueiro Góis", -427.86, "PIX", L("Milho e Grãos", "Corn and grains", "Maíz y granos")),
        tx("t11", "15:18", "Construlago", -423, L("Crédito (1 parcela)", "Credit (1 installment)", "Crédito (1 cuota)"), L("Equipamentos de construção", "Construction supplies", "Materiales de construcción")),
      ],
    },
    { id: "b-15dez", label: L("15 DEZ", "DEC 15", "15 DIC"), transactions: [tx("t12", "11:26", "Origami Papelaria", -578.3, L("Débito", "Debit", "Débito"))] },
    { id: "b-20dez", label: L("20 DEZ", "DEC 20", "20 DIC"), transactions: [tx("t13", "12:34", L("FamilySearch — assinatura digital", "FamilySearch — digital subscription", "FamilySearch — suscripción digital"), -36.5, L("Crédito", "Credit", "Crédito"), L("Assinatura", "Subscription", "Suscripción"))] },
    { id: "b-22dez", label: L("22 DEZ", "DEC 22", "22 DIC"), transactions: [tx("t14", "13:40", "Júnior Veículos", -40600, L("Débito", "Debit", "Débito"), "Kawasaki Versys X 300")] },
    { id: "b-23dez", label: L("23 DEZ", "DEC 23", "23 DIC"), transactions: [tx("t15", "10:00", L("Pensão mensal — Ações da Empresa de Transporte Firmino Ltda.", "Monthly pension — shares in Firmino Transport Ltd.", "Pensión mensual — acciones de Empresa de Transporte Firmino Ltda."), 2500, L("Adicionado", "Deposit", "Ingresado"), L("Pensão", "Pension", "Pensión"))] },
    { id: "b-10jan", label: L("10 JAN", "JAN 10", "10 ENE"), transactions: [tx("t16", "08:15", L("Revista de Ufologia — assinatura mensal", "UFO magazine — monthly subscription", "Revista de ufología — suscripción mensual"), -74.9, L("Crédito", "Credit", "Crédito"), L("Assinatura", "Subscription", "Suscripción"))] },
    {
      id: "b-16jan",
      label: L("16 JAN", "JAN 16", "16 ENE"),
      transactions: [
        {
          ...tx("t17", "15:41", "Aerovias Viagens", -8842, L("Crédito", "Credit", "Crédito"), L("Passagem de Avião — Bora Bora (PF)", "Air ticket — Bora Bora (round trip)", "Pasaje de avión — Bora Bora (ida y vuelta)")),
          lock: { passcode: "1987" },
        },
      ],
    },
  ],
};
