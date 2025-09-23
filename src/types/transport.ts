export interface TransportItem {
  id: string;
  meioTransporte: string;
  quantidadePassagem: string;
  operadora: string;
  valorPassagem: string;
}

export interface TransportData {
  id: string;
  useTransport: "" | "sim" | "nao";
  transports: TransportItem[];
}

export type TransportFormData = Omit<TransportData, "id">;
export type TransportItemFormData = Omit<TransportItem, "id">;

export const useTransportOptions = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
] as const;

export const meioTransporteOptions = [
  { value: "onibus", label: "Ônibus" },
  { value: "metro", label: "Metrô" },
  { value: "trem", label: "Trem" },
  { value: "brt", label: "BRT" },
  { value: "van", label: "Van" },
  { value: "taxi", label: "Táxi" },
  { value: "uber", label: "Uber/99" },
  { value: "outros", label: "Outros" },
] as const;

export const quantidadePassagemOptions = [
  { value: "1", label: "1 passagem por dia" },
  { value: "2", label: "2 passagens por dia" },
  { value: "3", label: "3 passagens por dia" },
  { value: "4", label: "4 passagens por dia" },
  { value: "5", label: "5 passagens por dia" },
  { value: "6", label: "6 passagens por dia" },
] as const;
