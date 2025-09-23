export interface ApprenticeData {
  id: string;
  isApprentice: "" | "sim" | "nao";
  modoContratacao: string;
  cnpjEntidadeQualificadora: string;
  cnpjExercicioAtividades: string;
  localPessoaJuridica: string;
}

export type ApprenticeFormData = Omit<ApprenticeData, "id">;

export const isApprenticeOptions = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
] as const;

export const modoContratacaoOptions = [
  { value: "clt", label: "CLT" },
  { value: "estagio", label: "Estágio" },
  { value: "terceirizado", label: "Terceirizado" },
  { value: "outros", label: "Outros" },
] as const;
