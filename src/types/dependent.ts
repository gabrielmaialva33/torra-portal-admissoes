export interface Dependent {
  id: string;
  nomeCompleto: string;
  grauParentesco: string;
  dataNascimento: string;
  cpf: string;
  documentos: {
    cpfFile: File | null;
    certidaoNascimento: File | null;
    documentoGuarda: File | null;
  };
}

export type DependentFormData = Omit<Dependent, "id">;

export const grausParentesco = [
  { value: "filho", label: "Filho(a)" },
  { value: "conjuge", label: "Cônjuge" },
  { value: "pai", label: "Pai" },
  { value: "mae", label: "Mãe" },
  { value: "irmao", label: "Irmão(ã)" },
  { value: "avo", label: "Avô(ó)" },
  { value: "outro", label: "Outro" },
] as const;
