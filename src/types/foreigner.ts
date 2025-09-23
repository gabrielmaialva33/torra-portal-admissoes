export interface ForeignerData {
  id: string;
  isForeigner: "" | "sim" | "nao";
  dataChegada: string;
  numeroRNE: string;
  nacionalidade: string;
  dataExpedicao: string;
  documentoRNE: File | null;
}

export type ForeignerFormData = Omit<ForeignerData, "id">;

export const isForeignerOptions = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
] as const;

export const nacionalidadeOptions = [
  { value: "argentina", label: "Argentina" },
  { value: "bolivia", label: "Bolívia" },
  { value: "chile", label: "Chile" },
  { value: "colombia", label: "Colômbia" },
  { value: "equador", label: "Equador" },
  { value: "guiana", label: "Guiana" },
  { value: "paraguai", label: "Paraguai" },
  { value: "peru", label: "Peru" },
  { value: "suriname", label: "Suriname" },
  { value: "uruguai", label: "Uruguai" },
  { value: "venezuela", label: "Venezuela" },
  { value: "estados_unidos", label: "Estados Unidos" },
  { value: "canada", label: "Canadá" },
  { value: "mexico", label: "México" },
  { value: "alemanha", label: "Alemanha" },
  { value: "espanha", label: "Espanha" },
  { value: "franca", label: "França" },
  { value: "italia", label: "Itália" },
  { value: "portugal", label: "Portugal" },
  { value: "reino_unido", label: "Reino Unido" },
  { value: "japao", label: "Japão" },
  { value: "china", label: "China" },
  { value: "coreia_sul", label: "Coreia do Sul" },
  { value: "india", label: "Índia" },
  { value: "outros", label: "Outros" },
] as const;