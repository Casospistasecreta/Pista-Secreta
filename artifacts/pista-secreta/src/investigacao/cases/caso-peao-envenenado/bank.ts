import type { BankData, Transaction } from "../../types";
import type { LocalizedText } from "@/i18n/types";
import { calendar, L } from "./helpers";

/*
 * NOVA (roteiro 4.6), mais recentes primeiro. "Crédito" = compra no cartão (saída).
 * Acrescentei as recargas de 03–06 MAI para bater com o aviso do banco ("6 recargas em 5 dias"). Saldo e horários são valores menores
 * acrescentados para o layout (escolhidos para não colidir com a Localização). A fatura de 09 MAI foi paga por terceiro e é a transação trancada (PIN 1997).
 */
const tx = (id: string, time: string, merchant: LocalizedText, amount: number, method: LocalizedText, category?: LocalizedText, extra: Partial<Transaction> = {}): Transaction => ({ id, time, merchant, amount, method, category, ...extra });

export const bank: BankData = {
  brand: "NOVA",
  holder: L("Rei Preto", "Black King", "Rey Negro"),
  currency: "BRL",
  balance: 38456.32,
  days: [
    { id: "b-0509", label: calendar("09 MAI"), transactions: [
      tx("t-fatura", "18:40", L("Pagamento de fatura — cartão adicional (Dama Preta)", "Bill payment — additional card (Black Queen)", "Pago de factura — tarjeta adicional (Reina Negra)"), -187430, L("Fatura · pago por terceiro", "Bill · paid by a third party", "Factura · pagada por un tercero"), L("Cartão de crédito", "Credit card", "Tarjeta de crédito"), {
        lock: { passcode: "1997", hint: L("O ano em que a máquina fez o Rei chorar.", "The year a machine made the King cry.", "El año en que una máquina hizo llorar al Rey.") },
        details: [
          { label: L("Pagador", "Payer", "Pagador"), value: L("SANTA DIAGONAL BENEFICENTE (PIX)", "SANTA DIAGONAL CHARITY (PIX)", "SANTA DIAGONAL BENEFICENCIA (PIX)") },
          { label: L("Mensagem do pagador", "Payer's message", "Mensaje del pagador"), value: L("“Troca justa. — Dom”", "“A fair trade. — Bishop”", "“Un intercambio justo. — Don”") },
          { label: L("Situação", "Status", "Estado"), value: L("Fatura quitada, sem pendências", "Bill paid in full, no balance due", "Factura pagada, sin saldo pendiente") },
        ],
      }),
    ] },
    { id: "b-0508", label: calendar("08 MAI"), transactions: [tx("t-0508", "14:20", L("Cartório Casa b1 — Registro de documento", "Registry Office, b1 Square — Document filing", "Registro de la casilla b1 — Inscripción de documento"), -214.5, L("Débito", "Debit", "Débito"), L("Serviços", "Services", "Servicios"))] },
    { id: "b-0507", label: calendar("07 MAI"), transactions: [tx("t-0507", "11:20", L("Farmácia Rock & Roi — Caneta autoinjetora de adrenalina (reposição)", "Rock & Roi Pharmacy — Epinephrine auto-injector (replacement)", "Farmacia Rock & Roi — Pluma autoinyectable de adrenalina (reposición)"), -389, L("Débito", "Debit", "Débito"), L("Saúde", "Health", "Salud"))] },
    { id: "b-0506", label: calendar("06 MAI"), transactions: [tx("t-0506", "02:41", L("GAMBET — Recarga (cartão adicional Dama Preta)", "GAMBET — Top-up (Black Queen's additional card)", "GAMBET — Recarga (tarjeta adicional de la Reina Negra)"), -3900, L("Crédito", "Credit", "Crédito"), L("Apostas", "Betting", "Apuestas"))] },
    { id: "b-0505", label: calendar("05 MAI"), transactions: [
      tx("t-0505c", "23:10", L("GAMBET — Recarga (cartão adicional Dama Preta)", "GAMBET — Top-up (Black Queen's additional card)", "GAMBET — Recarga (tarjeta adicional de la Reina Negra)"), -22000, L("Crédito", "Credit", "Crédito"), L("Apostas", "Betting", "Apuestas")),
      tx("t-0505b", "09:00", L("Revista Xadrez Mensal", "Monthly Chess Magazine", "Revista Ajedrez Mensual"), -49.9, L("Crédito", "Credit", "Crédito"), L("Assinatura", "Subscription", "Suscripción")),
      tx("t-0505a", "08:00", L("Rendimento Real", "Real Earnings", "Rendimiento Real"), 12000, L("Entrada", "Deposit", "Ingreso"), L("Renda", "Income", "Ingresos")),
    ] },
    { id: "b-0504", label: calendar("04 MAI"), transactions: [
      tx("t-0504b", "22:35", L("GAMBET — Recarga (cartão adicional Dama Preta)", "GAMBET — Top-up (Black Queen's additional card)", "GAMBET — Recarga (tarjeta adicional de la Reina Negra)"), -6200, L("Crédito", "Credit", "Crédito"), L("Apostas", "Betting", "Apuestas")),
      tx("t-0504a", "03:12", L("GAMBET — Recarga (cartão adicional Dama Preta)", "GAMBET — Top-up (Black Queen's additional card)", "GAMBET — Recarga (tarjeta adicional de la Reina Negra)"), -15000, L("Crédito", "Credit", "Crédito"), L("Apostas", "Betting", "Apuestas")),
    ] },
    { id: "b-0503", label: calendar("03 MAI"), transactions: [tx("t-0503", "01:50", L("GAMBET — Recarga (cartão adicional Dama Preta)", "GAMBET — Top-up (Black Queen's additional card)", "GAMBET — Recarga (tarjeta adicional de la Reina Negra)"), -8500, L("Crédito", "Credit", "Crédito"), L("Apostas", "Betting", "Apuestas"))] },
    { id: "b-0502", label: calendar("02 MAI"), transactions: [tx("t-0502", "00:30", L("GAMBET — Recarga (cartão adicional Dama Preta)", "GAMBET — Top-up (Black Queen's additional card)", "GAMBET — Recarga (tarjeta adicional de la Reina Negra)"), -41000, L("Crédito", "Credit", "Crédito"), L("Apostas", "Betting", "Apuestas"))] },
    { id: "b-0501", label: calendar("01 MAI"), transactions: [tx("t-0501", "07:00", L("Assinatura TabuLive Premium", "TabuLive Premium subscription", "Suscripción a TabuLive Premium"), -29.9, L("Crédito", "Credit", "Crédito"), L("Assinatura", "Subscription", "Suscripción"))] },
    { id: "b-0427", label: calendar("27 ABR"), transactions: [tx("t-0427", "10:25", L("Santa Diagonal Beneficente — Doação, Campanha da Obra", "Santa Diagonal Charity — Donation, Mission campaign", "Santa Diagonal Beneficencia — Donación, campaña de la Obra"), -500, "PIX", L("Doação", "Donation", "Donación"))] },
    { id: "b-0422", label: calendar("22 ABR"), transactions: [tx("t-0422", "22:20", L("GAMBET — Recarga (cartão adicional Dama Preta)", "GAMBET — Top-up (Black Queen's additional card)", "GAMBET — Recarga (tarjeta adicional de la Reina Negra)"), -28000, L("Crédito", "Credit", "Crédito"), L("Apostas", "Betting", "Apuestas"))] },
    { id: "b-0415", label: calendar("15 ABR"), transactions: [tx("t-0415", "08:10", L("Clube Fianchetto — Mensalidade", "Fianchetto Club — Membership", "Club Fianchetto — Cuota mensual"), -890, L("Débito automático", "Direct debit", "Débito automático"), L("Lazer", "Leisure", "Ocio"))] },
    { id: "b-0405", label: calendar("05 ABR"), transactions: [tx("t-0405", "08:00", L("Rendimento Real", "Real Earnings", "Rendimiento Real"), 12000, L("Entrada", "Deposit", "Ingreso"), L("Renda", "Income", "Ingresos"))] },
    { id: "b-0402", label: calendar("02 ABR"), transactions: [tx("t-0402", "00:05", L("GAMBET — Recarga (cartão adicional Dama Preta)", "GAMBET — Top-up (Black Queen's additional card)", "GAMBET — Recarga (tarjeta adicional de la Reina Negra)"), -12000, L("Crédito", "Credit", "Crédito"), L("Apostas", "Betting", "Apuestas"))] },
    { id: "b-0328", label: calendar("28 MAR"), transactions: [tx("t-0328", "21:30", L("GAMBET — Recarga (cartão adicional Dama Preta)", "GAMBET — Top-up (Black Queen's additional card)", "GAMBET — Recarga (tarjeta adicional de la Reina Negra)"), -5000, L("Crédito", "Credit", "Crédito"), L("Apostas", "Betting", "Apuestas"))] },
  ],
};
