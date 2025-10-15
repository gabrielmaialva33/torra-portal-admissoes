/**
 * Mapper functions to transform between Zustand store data and API DTOs
 * These functions handle field name conversions (camelCase <-> snake_case in Portuguese)
 */

import type { PersonalData } from "@/stores/onboarding-store";
import type { AddressFormData } from "@/types/address";
import type { ApprenticeFormData } from "@/types/apprentice";
import type { BankingFormData } from "@/types/banking";
import type { ContractualFormData } from "@/types/contractual";
import type { Dependent } from "@/types/dependent";
import type { ForeignerFormData } from "@/types/foreigner";
import type { PCDFormData } from "@/types/pcd";
import type { TransportFormData } from "@/types/transport";
import type {
  DadosAprendizDto,
  DadosBancariosDto,
  DadosContratuaisDto,
  DadosEstrangeiroDto,
  DadosGeraisDto,
  DadosPcdDto,
  DependenteDto,
  DependentesDto,
  EnderecoDto,
  LinhaTransporteDto,
  ValeTransporteDto,
} from "@/types/api.types";

/**
 * Map PersonalData (Zustand) to DadosGeraisDto (API)
 */
export function mapPersonalDataToDto(
  data: Partial<PersonalData>,
): DadosGeraisDto {
  return {
    nomeCompleto: data.fullName || "",
    cpf: data.cpf || "",
    rg: data.rg || "",
    dataNascimento: data.birthDate || "",
    email: data.email || "",
    telefone: data.phone || "",
    estadoCivil: data.maritalStatus || "",
    genero: data.gender || "",
    nacionalidade: data.nationality || "",
  };
}

/**
 * Map DadosGeraisDto (API) to PersonalData (Zustand)
 */
export function mapDtoToPersonalData(dto: DadosGeraisDto): PersonalData {
  return {
    fullName: dto.nomeCompleto,
    cpf: dto.cpf,
    rg: dto.rg,
    birthDate: dto.dataNascimento,
    email: dto.email,
    phone: dto.telefone,
    maritalStatus: dto.estadoCivil,
    gender: dto.genero,
    nationality: dto.nacionalidade,
  };
}

/**
 * Map Dependent (Zustand) to DependenteDto (API)
 */
export function mapDependentToDto(dependent: Dependent): DependenteDto {
  return {
    nome: dependent.nomeCompleto,
    cpf: dependent.cpf,
    dataNascimento: dependent.dataNascimento,
    parentesco: dependent.grauParentesco,
  };
}

/**
 * Map DependenteDto (API) to Dependent (Zustand)
 */
export function mapDtoToDependent(dto: DependenteDto, id?: string): Dependent {
  return {
    id: id || crypto.randomUUID(),
    nomeCompleto: dto.nome,
    cpf: dto.cpf,
    dataNascimento: dto.dataNascimento,
    grauParentesco: dto.parentesco,
    documentos: {
      cpfFile: null,
      certidaoNascimento: null,
      documentoGuarda: null,
    },
  };
}

/**
 * Map Dependents array to DependentesDto (API)
 */
export function mapDependentsToDto(dependents: Dependent[]): DependentesDto {
  return {
    dependentes: dependents.map(mapDependentToDto),
  };
}

/**
 * Map AddressFormData (Zustand) to EnderecoDto (API)
 */
export function mapAddressToDto(data: Partial<AddressFormData>): EnderecoDto {
  return {
    cep: data.cep || "",
    logradouro: data.endereco || "",
    numero: data.numero || "",
    complemento: data.complemento,
    bairro: data.bairro || "",
    cidade: data.cidade || "",
    estado: "", // Not in AddressFormData, may need to add
  };
}

/**
 * Map EnderecoDto (API) to AddressFormData (Zustand)
 */
export function mapDtoToAddress(dto: EnderecoDto): AddressFormData {
  return {
    cep: dto.cep,
    endereco: dto.logradouro,
    numero: dto.numero,
    complemento: dto.complemento || "",
    bairro: dto.bairro,
    cidade: dto.cidade,
    municipio: "", // Not in DTO
    telefone: "", // Not in DTO
    comprovante: null,
  };
}

/**
 * Map ContractualFormData (Zustand) to DadosContratuaisDto (API)
 */
export function mapContractDataToDto(
  data: Partial<ContractualFormData>,
): DadosContratuaisDto {
  return {
    cargo: "", // Not in ContractualFormData
    departamento: "",
    dataAdmissao: "",
    salario: "",
    horarioTrabalho: "",
    tipoContrato: "",
  };
}

/**
 * Map DadosContratuaisDto (API) to ContractualFormData (Zustand)
 */
export function mapDtoToContractData(dto: DadosContratuaisDto): ContractualFormData {
  return {
    primeiroEmprego: "",
    numeroPIS: "",
    numeroCNH: "",
    dataVencimentoCNH: "",
    comprovantePIS: null,
  };
}

/**
 * Map PCDFormData (Zustand) to DadosPcdDto (API)
 */
export function mapDisabilityDataToDto(
  data: Partial<PCDFormData>,
): DadosPcdDto {
  return {
    possuiDeficiencia: data.isPCD === "sim",
    tipoDeficiencia: "",
    cid: "",
    necessidadesEspeciais: data.observacao,
  };
}

/**
 * Map DadosPcdDto (API) to PCDFormData (Zustand)
 */
export function mapDtoToDisabilityData(dto: DadosPcdDto): PCDFormData {
  return {
    isPCD: dto.possuiDeficiencia ? "sim" : "nao",
    deficienciaVisual: "",
    deficienciaAuditiva: "",
    deficienciaMental: "",
    deficienciaIntelectual: "",
    deficienciaFisica: "",
    observacao: dto.necessidadesEspeciais || "",
    laudoMedico: null,
  };
}

/**
 * Map TransportFormData (Zustand) to ValeTransporteDto (API)
 */
export function mapTransportDataToDto(
  data: Partial<TransportFormData>,
): ValeTransporteDto {
  const linhas: LinhaTransporteDto[] | undefined = data.transports?.map((transport) => ({
    tipo: transport.meioTransporte,
    linha: transport.operadora,
    tarifa: transport.valorPassagem,
  }));

  return {
    necessitaValeTransporte: data.useTransport === "sim",
    linhas: linhas,
  };
}

/**
 * Map ValeTransporteDto (API) to TransportFormData (Zustand)
 */
export function mapDtoToTransportData(dto: ValeTransporteDto): TransportFormData {
  const transports = dto.linhas?.map((linha) => ({
    id: crypto.randomUUID(),
    meioTransporte: linha.tipo,
    quantidadePassagem: "",
    operadora: linha.linha,
    valorPassagem: linha.tarifa,
  }));

  return {
    useTransport: dto.necessitaValeTransporte ? "sim" : "nao",
    transports: transports || [],
  };
}

/**
 * Map ForeignerFormData (Zustand) to DadosEstrangeiroDto (API)
 */
export function mapForeignerDataToDto(
  data: Partial<ForeignerFormData>,
): DadosEstrangeiroDto {
  return {
    estrangeiro: data.isForeigner === "sim",
    numeroPassaporte: data.numeroRNE,
    tipoVisto: "",
    validadeVisto: data.dataExpedicao,
    paisOrigem: data.nacionalidade,
  };
}

/**
 * Map DadosEstrangeiroDto (API) to ForeignerFormData (Zustand)
 */
export function mapDtoToForeignerData(dto: DadosEstrangeiroDto): ForeignerFormData {
  return {
    isForeigner: dto.estrangeiro ? "sim" : "nao",
    dataChegada: "",
    numeroRNE: dto.numeroPassaporte || "",
    nacionalidade: dto.paisOrigem || "",
    dataExpedicao: dto.validadeVisto || "",
    documentoRNE: null,
  };
}

/**
 * Map ApprenticeFormData (Zustand) to DadosAprendizDto (API)
 */
export function mapApprenticeDataToDto(
  data: Partial<ApprenticeFormData>,
): DadosAprendizDto {
  return {
    aprendiz: data.isApprentice === "sim",
    instituicaoEnsino: "",
    curso: "",
    horarioAulas: "",
  };
}

/**
 * Map DadosAprendizDto (API) to ApprenticeFormData (Zustand)
 */
export function mapDtoToApprenticeData(dto: DadosAprendizDto): ApprenticeFormData {
  return {
    isApprentice: dto.aprendiz ? "sim" : "nao",
    modoContratacao: "",
    cnpjEntidadeQualificadora: "",
    cnpjExercicioAtividades: "",
    localPessoaJuridica: "",
  };
}

/**
 * Map BankingFormData (Zustand) to DadosBancariosDto (API)
 */
export function mapBankDataToDto(data: Partial<BankingFormData>): DadosBancariosDto {
  return {
    nomeBanco: "Itaú", // Assuming Itaú based on isItauCustomer field
    codigoBanco: "",
    agencia: data.agenciaBancaria || "",
    numeroConta: data.numeroConta || "",
    tipoConta: (data.tipoConta as "corrente" | "poupanca") || "corrente",
    chavePix: "",
  };
}

/**
 * Map DadosBancariosDto (API) to BankingFormData (Zustand)
 */
export function mapDtoToBankData(dto: DadosBancariosDto): BankingFormData {
  return {
    isItauCustomer: dto.nomeBanco === "Itaú" ? "sim" : "nao",
    agenciaBancaria: dto.agencia,
    tipoConta: dto.tipoConta,
    numeroConta: dto.numeroConta,
    digito: "",
  };
}

/**
 * Utility function to format dates to ISO 8601
 */
export function formatDateToISO(date: string | Date): string {
  if (typeof date === "string") {
    // If already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date;
    }
    // If in DD/MM/YYYY format, convert to YYYY-MM-DD
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
      const [day, month, year] = date.split("/");
      return `${year}-${month}-${day}`;
    }
  }

  if (date instanceof Date) {
    return date.toISOString().split("T")[0];
  }

  return date.toString();
}

/**
 * Utility function to format dates from ISO to Brazilian format
 */
export function formatDateFromISO(isoDate: string): string {
  if (!isoDate) return "";

  // If in YYYY-MM-DD format, convert to DD/MM/YYYY
  if (/^\d{4}-\d{2}-\d{2}/.test(isoDate)) {
    const [year, month, day] = isoDate.split("T")[0].split("-");
    return `${day}/${month}/${year}`;
  }

  return isoDate;
}

/**
 * Clean CPF formatting (remove dots and dashes)
 */
export function cleanCPF(cpf: string): string {
  return cpf.replace(/\D/g, "");
}

/**
 * Format CPF with dots and dashes
 */
export function formatCPF(cpf: string): string {
  const clean = cleanCPF(cpf);
  return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

/**
 * Clean phone formatting
 */
export function cleanPhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

/**
 * Format phone with parentheses and dashes
 */
export function formatPhone(phone: string): string {
  const clean = cleanPhone(phone);
  if (clean.length === 11) {
    return clean.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  if (clean.length === 10) {
    return clean.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }
  return phone;
}

/**
 * Clean CEP formatting
 */
export function cleanCEP(cep: string): string {
  return cep.replace(/\D/g, "");
}

/**
 * Format CEP with dash
 */
export function formatCEP(cep: string): string {
  const clean = cleanCEP(cep);
  return clean.replace(/(\d{5})(\d{3})/, "$1-$2");
}
