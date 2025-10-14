/**
 * Mapper functions to transform between Zustand store data and API DTOs
 * These functions handle field name conversions (camelCase <-> snake_case in Portuguese)
 */

import type {
  Address,
  ApprenticeData,
  BankData,
  ContractData,
  Dependent,
  DisabilityData,
  ForeignerData,
  PersonalData,
  TransportData,
} from "@/stores/onboarding-store";
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
    nome: dependent.name,
    cpf: dependent.cpf,
    dataNascimento: dependent.birthDate,
    parentesco: dependent.relationship,
  };
}

/**
 * Map DependenteDto (API) to Dependent (Zustand)
 */
export function mapDtoToDependent(dto: DependenteDto, id?: string): Dependent {
  return {
    id: id || crypto.randomUUID(),
    name: dto.nome,
    cpf: dto.cpf,
    birthDate: dto.dataNascimento,
    relationship: dto.parentesco,
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
 * Map Address (Zustand) to EnderecoDto (API)
 */
export function mapAddressToDto(data: Partial<Address>): EnderecoDto {
  return {
    cep: data.zipCode || "",
    logradouro: data.street || "",
    numero: data.number || "",
    complemento: data.complement,
    bairro: data.neighborhood || "",
    cidade: data.city || "",
    estado: data.state || "",
  };
}

/**
 * Map EnderecoDto (API) to Address (Zustand)
 */
export function mapDtoToAddress(dto: EnderecoDto): Address {
  return {
    zipCode: dto.cep,
    street: dto.logradouro,
    number: dto.numero,
    complement: dto.complemento,
    neighborhood: dto.bairro,
    city: dto.cidade,
    state: dto.estado,
  };
}

/**
 * Map ContractData (Zustand) to DadosContratuaisDto (API)
 */
export function mapContractDataToDto(
  data: Partial<ContractData>,
): DadosContratuaisDto {
  return {
    cargo: data.position || "",
    departamento: data.department || "",
    dataAdmissao: data.admissionDate || "",
    salario: data.salary || "",
    horarioTrabalho: data.workSchedule || "",
    tipoContrato: data.contractType || "",
  };
}

/**
 * Map DadosContratuaisDto (API) to ContractData (Zustand)
 */
export function mapDtoToContractData(dto: DadosContratuaisDto): ContractData {
  return {
    position: dto.cargo,
    department: dto.departamento,
    admissionDate: dto.dataAdmissao,
    salary: dto.salario,
    workSchedule: dto.horarioTrabalho,
    contractType: dto.tipoContrato,
  };
}

/**
 * Map DisabilityData (Zustand) to DadosPcdDto (API)
 */
export function mapDisabilityDataToDto(
  data: Partial<DisabilityData>,
): DadosPcdDto {
  return {
    possuiDeficiencia: data.hasDisability || false,
    tipoDeficiencia: data.type,
    cid: data.cid,
    necessidadesEspeciais: data.needs,
  };
}

/**
 * Map DadosPcdDto (API) to DisabilityData (Zustand)
 */
export function mapDtoToDisabilityData(dto: DadosPcdDto): DisabilityData {
  return {
    hasDisability: dto.possuiDeficiencia,
    type: dto.tipoDeficiencia,
    cid: dto.cid,
    needs: dto.necessidadesEspeciais,
  };
}

/**
 * Map TransportData (Zustand) to ValeTransporteDto (API)
 */
export function mapTransportDataToDto(
  data: Partial<TransportData>,
): ValeTransporteDto {
  const linhas: LinhaTransporteDto[] | undefined = data.lines?.map((line) => ({
    tipo: line.type,
    linha: line.line,
    tarifa: line.fare,
  }));

  return {
    necessitaValeTransporte: data.needsTransportVoucher || false,
    linhas: linhas,
  };
}

/**
 * Map ValeTransporteDto (API) to TransportData (Zustand)
 */
export function mapDtoToTransportData(dto: ValeTransporteDto): TransportData {
  const lines = dto.linhas?.map((linha) => ({
    id: crypto.randomUUID(),
    type: linha.tipo,
    line: linha.linha,
    fare: linha.tarifa,
  }));

  return {
    needsTransportVoucher: dto.necessitaValeTransporte,
    lines: lines,
  };
}

/**
 * Map ForeignerData (Zustand) to DadosEstrangeiroDto (API)
 */
export function mapForeignerDataToDto(
  data: Partial<ForeignerData>,
): DadosEstrangeiroDto {
  return {
    estrangeiro: data.isForeigner || false,
    numeroPassaporte: data.passportNumber,
    tipoVisto: data.visaType,
    validadeVisto: data.visaExpiry,
    paisOrigem: data.countryOfOrigin,
  };
}

/**
 * Map DadosEstrangeiroDto (API) to ForeignerData (Zustand)
 */
export function mapDtoToForeignerData(dto: DadosEstrangeiroDto): ForeignerData {
  return {
    isForeigner: dto.estrangeiro,
    passportNumber: dto.numeroPassaporte,
    visaType: dto.tipoVisto,
    visaExpiry: dto.validadeVisto,
    countryOfOrigin: dto.paisOrigem,
  };
}

/**
 * Map ApprenticeData (Zustand) to DadosAprendizDto (API)
 */
export function mapApprenticeDataToDto(
  data: Partial<ApprenticeData>,
): DadosAprendizDto {
  return {
    aprendiz: data.isApprentice || false,
    instituicaoEnsino: data.institution,
    curso: data.course,
    horarioAulas: data.schedule,
  };
}

/**
 * Map DadosAprendizDto (API) to ApprenticeData (Zustand)
 */
export function mapDtoToApprenticeData(dto: DadosAprendizDto): ApprenticeData {
  return {
    isApprentice: dto.aprendiz,
    institution: dto.instituicaoEnsino,
    course: dto.curso,
    schedule: dto.horarioAulas,
  };
}

/**
 * Map BankData (Zustand) to DadosBancariosDto (API)
 */
export function mapBankDataToDto(data: Partial<BankData>): DadosBancariosDto {
  // Convert account type from English to Portuguese
  let tipoConta: "corrente" | "poupanca" = "corrente";
  if (data.accountType === "savings") {
    tipoConta = "poupanca";
  } else if (data.accountType === "checking" || data.accountType === "corrente") {
    tipoConta = "corrente";
  }

  return {
    nomeBanco: data.bankName || "",
    codigoBanco: data.bankCode || "",
    agencia: data.agency || "",
    numeroConta: data.accountNumber || "",
    tipoConta,
    chavePix: data.pixKey,
  };
}

/**
 * Map DadosBancariosDto (API) to BankData (Zustand)
 */
export function mapDtoToBankData(dto: DadosBancariosDto): BankData {
  // Convert account type from Portuguese to English
  const accountType: "checking" | "savings" = dto.tipoConta === "poupanca" ? "savings" : "checking";

  return {
    bankName: dto.nomeBanco,
    bankCode: dto.codigoBanco,
    agency: dto.agencia,
    accountNumber: dto.numeroConta,
    accountType,
    pixKey: dto.chavePix,
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
