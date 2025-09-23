export interface PCDData {
  id: string;
  isPCD: "" | "sim" | "nao";
  deficienciaVisual: string;
  deficienciaAuditiva: string;
  deficienciaMental: string;
  deficienciaIntelectual: string;
  deficienciaFisica: string;
  observacao: string;
  laudoMedico: File | null;
}

export type PCDFormData = Omit<PCDData, "id">;

export const isPCDOptions = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
] as const;

export const deficienciaOptions = [
  { value: "nenhuma", label: "Nenhuma" },
  { value: "leve", label: "Leve" },
  { value: "moderada", label: "Moderada" },
  { value: "severa", label: "Severa" },
  { value: "profunda", label: "Profunda" },
] as const;
