// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message: string;
  errors?: string[];
}

// Step 1: Dados Gerais (Personal Data)
export interface DadosGeraisDto {
  nomeCompleto: string;
  cpf: string;
  rg: string;
  dataNascimento: string; // ISO 8601 format
  email: string;
  telefone: string;
  estadoCivil: string;
  genero: string;
  nacionalidade: string;
}

// Step 2: Dependentes (Dependents)
export interface DependenteDto {
  nome: string;
  cpf: string;
  dataNascimento: string; // ISO 8601 format
  parentesco: string;
}

export interface DependentesDto {
  dependentes: DependenteDto[];
}

// Step 3: Endereço (Address)
export interface EnderecoDto {
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
}

// Step 4: Dados Contratuais (Contract Data)
export interface DadosContratuaisDto {
  cargo: string;
  departamento: string;
  dataAdmissao: string; // ISO 8601 format
  salario: string;
  horarioTrabalho: string;
  tipoContrato: string;
}

// Step 5: Dados PCD (Disability Data)
export interface DadosPcdDto {
  possuiDeficiencia: boolean;
  tipoDeficiencia?: string;
  cid?: string;
  necessidadesEspeciais?: string;
}

// Step 6: Vale Transporte (Transport Data)
export interface LinhaTransporteDto {
  tipo: string;
  linha: string;
  tarifa: string;
}

export interface ValeTransporteDto {
  necessitaValeTransporte: boolean;
  linhas?: LinhaTransporteDto[];
}

// Step 7: Dados Estrangeiro (Foreigner Data)
export interface DadosEstrangeiroDto {
  estrangeiro: boolean;
  numeroPassaporte?: string;
  tipoVisto?: string;
  validadeVisto?: string; // ISO 8601 format
  paisOrigem?: string;
}

// Step 8: Dados Aprendiz (Apprentice Data)
export interface DadosAprendizDto {
  aprendiz: boolean;
  instituicaoEnsino?: string;
  curso?: string;
  horarioAulas?: string;
}

// Step 9: Dados Bancários (Bank Data)
export interface DadosBancariosDto {
  nomeBanco: string;
  codigoBanco: string;
  agencia: string;
  numeroConta: string;
  tipoConta: "corrente" | "poupanca";
  chavePix?: string;
}

// Step 10: Document Upload
export interface DocumentoUploadDto {
  arquivo: File;
  tipoDocumento: string;
  stepId: number;
}

export interface DocumentoResponseDto {
  id: string;
  nome: string;
  tipo: string;
  url: string;
  stepId: number;
  status: "pending" | "uploaded" | "approved" | "rejected";
  uploadedAt: string;
}

// Colaborador (Employee) Types
export interface ColaboradorDto {
  id: string;
  nomeCompleto?: string;
  cpf?: string;
  email?: string;
  stepAtual: number;
  stepsCompletos: number[];
  createdAt: string;
  updatedAt: string;
}

// Error Response
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: string[];
  statusCode?: number;
}

// Pagination (for future use)
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}
