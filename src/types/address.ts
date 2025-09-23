export interface Address {
  id: string;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  complemento: string;
  municipio: string;
  telefone: string;
  comprovante: File | null;
}

export type AddressFormData = Omit<Address, "id">;
