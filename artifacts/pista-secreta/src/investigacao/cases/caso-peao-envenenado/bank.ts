import type { BankData, Transaction } from "../../types";

/*
 * NOVA (roteiro 4.6), mais recentes primeiro. "Crédito" = compra no cartão (saída).
 * Acrescentei as recargas de 03–06 MAI para bater com o aviso do banco ("6 recargas em 5 dias"). Saldo e horários são valores menores
 * acrescentados para o layout (escolhidos para não colidir com a Localização). A fatura de 09 MAI foi paga por terceiro e é a transação trancada (PIN 1997).
 */
const tx = (id: string, time: string, merchant: string, amount: number, method: string, category?: string, extra: Partial<Transaction> = {}): Transaction => ({ id, time, merchant, amount, method, category, ...extra });

export const bank: BankData = {
  brand: "NOVA",
  holder: "Rei Preto",
  currency: "BRL",
  balance: 38456.32,
  days: [
    { id: "b-0509", label: "09 MAI", transactions: [
      tx("t-fatura", "18:40", "Pagamento de fatura — cartão adicional (Dama Preta)", -187430, "Fatura · pago por terceiro", "Cartão de crédito", {
        lock: { passcode: "1997", hint: "O ano em que a máquina fez o Rei chorar." },
        details: [
          { label: "Pagador", value: "SANTA DIAGONAL BENEFICENTE (PIX)" },
          { label: "Mensagem do pagador", value: "“Troca justa. — Dom”" },
          { label: "Situação", value: "Fatura quitada, sem pendências" },
        ],
      }),
    ] },
    { id: "b-0508", label: "08 MAI", transactions: [tx("t-0508", "14:20", "Cartório Casa b1 — Registro de documento", -214.5, "Débito", "Serviços")] },
    { id: "b-0507", label: "07 MAI", transactions: [tx("t-0507", "11:20", "Farmácia Rock & Roi — Caneta autoinjetora de adrenalina (reposição)", -389, "Débito", "Saúde")] },
    { id: "b-0506", label: "06 MAI", transactions: [tx("t-0506", "02:41", "GAMBET — Recarga (cartão adicional Dama Preta)", -3900, "Crédito", "Apostas")] },
    { id: "b-0505", label: "05 MAI", transactions: [
      tx("t-0505c", "23:10", "GAMBET — Recarga (cartão adicional Dama Preta)", -22000, "Crédito", "Apostas"),
      tx("t-0505b", "09:00", "Revista Xadrez Mensal", -49.9, "Crédito", "Assinatura"),
      tx("t-0505a", "08:00", "Rendimento Real", 12000, "Entrada", "Renda"),
    ] },
    { id: "b-0504", label: "04 MAI", transactions: [
      tx("t-0504b", "22:35", "GAMBET — Recarga (cartão adicional Dama Preta)", -6200, "Crédito", "Apostas"),
      tx("t-0504a", "03:12", "GAMBET — Recarga (cartão adicional Dama Preta)", -15000, "Crédito", "Apostas"),
    ] },
    { id: "b-0503", label: "03 MAI", transactions: [tx("t-0503", "01:50", "GAMBET — Recarga (cartão adicional Dama Preta)", -8500, "Crédito", "Apostas")] },
    { id: "b-0502", label: "02 MAI", transactions: [tx("t-0502", "00:30", "GAMBET — Recarga (cartão adicional Dama Preta)", -41000, "Crédito", "Apostas")] },
    { id: "b-0501", label: "01 MAI", transactions: [tx("t-0501", "07:00", "Assinatura TabuLive Premium", -29.9, "Crédito", "Assinatura")] },
    { id: "b-0427", label: "27 ABR", transactions: [tx("t-0427", "10:25", "Santa Diagonal Beneficente — Doação, Campanha da Obra", -500, "PIX", "Doação")] },
    { id: "b-0422", label: "22 ABR", transactions: [tx("t-0422", "22:20", "GAMBET — Recarga (cartão adicional Dama Preta)", -28000, "Crédito", "Apostas")] },
    { id: "b-0415", label: "15 ABR", transactions: [tx("t-0415", "08:10", "Clube Fianchetto — Mensalidade", -890, "Débito automático", "Lazer")] },
    { id: "b-0405", label: "05 ABR", transactions: [tx("t-0405", "08:00", "Rendimento Real", 12000, "Entrada", "Renda")] },
    { id: "b-0402", label: "02 ABR", transactions: [tx("t-0402", "00:05", "GAMBET — Recarga (cartão adicional Dama Preta)", -12000, "Crédito", "Apostas")] },
    { id: "b-0328", label: "28 MAR", transactions: [tx("t-0328", "21:30", "GAMBET — Recarga (cartão adicional Dama Preta)", -5000, "Crédito", "Apostas")] },
  ],
};
