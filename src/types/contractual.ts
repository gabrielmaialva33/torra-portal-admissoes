export interface ContractualData {
  id: string;
  primeiroEmprego: "" | "sim" | "nao";
  numeroPIS: string;
  numeroCNH: string;
  dataVencimentoCNH: string;
  comprovantePIS: File | null;
}

export type ContractualFormData = Omit<ContractualData, "id">;

export const primeiroEmpregoOptions = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
] as const;
