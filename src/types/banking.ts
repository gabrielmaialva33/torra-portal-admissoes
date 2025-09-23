export interface BankingData {
  id: string;
  isItauCustomer: "" | "sim" | "nao";
  agenciaBancaria: string;
  tipoConta: string;
  numeroConta: string;
  digito: string;
}

export type BankingFormData = Omit<BankingData, "id">;

export const isItauCustomerOptions = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
] as const;

export const tipoContaOptions = [
  { value: "corrente", label: "Corrente" },
  { value: "poupanca", label: "Poupança" },
] as const;
