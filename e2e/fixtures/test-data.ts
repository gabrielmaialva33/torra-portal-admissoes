/**
 * Test Data Fixtures for Torra Portal Admissões E2E Tests
 *
 * This file contains mock data for all 10 onboarding steps with valid Brazilian formats
 * for CPF, RG, CEP, phone numbers, and other localized data.
 */

import { randomUUID } from "crypto";

/**
 * Generates a valid CPF (Cadastro de Pessoas Físicas) using Luhn algorithm
 * @returns A valid CPF string in format XXX.XXX.XXX-XX
 */
export function generateValidCPF(): string {
  const randomDigits = () => Math.floor(Math.random() * 9);

  // Generate first 9 digits
  const digits = Array.from({ length: 9 }, randomDigits);

  // Calculate first verification digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * (10 - i);
  }
  let firstDigit = 11 - (sum % 11);
  firstDigit = firstDigit >= 10 ? 0 : firstDigit;
  digits.push(firstDigit);

  // Calculate second verification digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += digits[i] * (11 - i);
  }
  let secondDigit = 11 - (sum % 11);
  secondDigit = secondDigit >= 10 ? 0 : secondDigit;
  digits.push(secondDigit);

  // Format as XXX.XXX.XXX-XX
  const cpf = digits.join("");
  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
}

/**
 * Generates a random valid RG (Registro Geral)
 * @returns A valid RG string in format XX.XXX.XXX-X
 */
export function generateValidRG(): string {
  const digits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 9));
  const rg = digits.join("");
  return `${rg.slice(0, 2)}.${rg.slice(2, 5)}.${rg.slice(5, 8)}-${rg.slice(8)}`;
}

/**
 * Generates a valid Brazilian phone number
 * @returns Phone string in format (XX) XXXXX-XXXX
 */
export function generateValidPhone(): string {
  const ddd = Math.floor(Math.random() * 89) + 11; // DDD from 11 to 99
  const prefix = 9; // Mobile numbers start with 9
  const number = Math.floor(Math.random() * 100000000).toString().padStart(8, "0");
  return `(${ddd}) ${prefix}${number.slice(0, 4)}-${number.slice(4)}`;
}

/**
 * Generates a valid CEP (Brazilian postal code)
 * @returns CEP string in format XXXXX-XXX
 */
export function generateValidCEP(): string {
  const cep = Math.floor(Math.random() * 99999999).toString().padStart(8, "0");
  return `${cep.slice(0, 5)}-${cep.slice(5)}`;
}

/**
 * Generates a random Brazilian name
 */
export function generateRandomName(): string {
  const firstNames = ["João", "Maria", "Pedro", "Ana", "Carlos", "Julia", "Lucas", "Mariana"];
  const lastNames = ["Silva", "Santos", "Oliveira", "Souza", "Costa", "Ferreira", "Rodrigues", "Almeida"];
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}

/**
 * Step 1: Personal Data - Complete valid test data
 */
export const personalDataTestData = {
  valid: {
    nomeCompleto: "João Pedro da Silva Santos",
    nomeSocial: "",
    dataNascimento: "1990-05-15",
    celular: "(11) 98765-4321",
    nomePai: "Pedro José Santos",
    nomeMae: "Maria da Silva Santos",
    numeroRG: "12.345.678-9",
    dataEmissaoRG: "2010-03-20",
    orgaoEmissor: "SSP-SP",
    cpf: "123.456.789-09",
    estadoCivil: "solteiro",
    grauEscolaridade: "superior_completo",
    genero: "masculino",
    nacionalidade: "Brasileiro",
    email: "joao.santos@example.com",
  },
  invalid: {
    cpfInvalid: "111.111.111-11", // Invalid CPF
    cpfIncomplete: "123.456",
    phoneInvalid: "11 9",
    emailInvalid: "invalid-email",
    birthDateFuture: "2030-01-01",
    birthDateTooOld: "1900-01-01",
  },
};

/**
 * Step 2: Dependents - Test data for multiple dependents
 */
export const dependentsTestData = {
  valid: [
    {
      id: randomUUID(),
      nome: "Maria da Silva Santos",
      cpf: generateValidCPF(),
      dataNascimento: "2015-08-10",
      parentesco: "filho",
    },
    {
      id: randomUUID(),
      nome: "Pedro da Silva Santos",
      cpf: generateValidCPF(),
      dataNascimento: "2018-03-25",
      parentesco: "filho",
    },
  ],
  single: {
    id: randomUUID(),
    nome: "Ana Paula Santos",
    cpf: generateValidCPF(),
    dataNascimento: "2010-12-05",
    parentesco: "filho",
  },
};

/**
 * Step 3: Address - Brazilian address test data
 */
export const addressTestData = {
  valid: {
    cep: "01310-100",
    logradouro: "Avenida Paulista",
    numero: "1578",
    complemento: "Apto 123",
    bairro: "Bela Vista",
    cidade: "São Paulo",
    estado: "SP",
  },
  validWithoutComplement: {
    cep: "20040-020",
    logradouro: "Rua da Assembleia",
    numero: "10",
    complemento: "",
    bairro: "Centro",
    cidade: "Rio de Janeiro",
    estado: "RJ",
  },
  invalidCEP: {
    cep: "00000-000",
  },
};

/**
 * Step 4: Contract Data - Employment information
 */
export const contractDataTestData = {
  valid: {
    cargo: "Desenvolvedor Full Stack",
    departamento: "Tecnologia",
    dataAdmissao: "2025-01-15",
    salario: "8500.00",
    horarioTrabalho: "09:00-18:00",
    tipoContrato: "CLT",
  },
  partTime: {
    cargo: "Estagiário",
    departamento: "Marketing",
    dataAdmissao: "2025-02-01",
    salario: "1500.00",
    horarioTrabalho: "14:00-18:00",
    tipoContrato: "Estágio",
  },
};

/**
 * Step 5: Disability Data (PCD)
 */
export const disabilityDataTestData = {
  withDisability: {
    possuiDeficiencia: true,
    tipoDeficiencia: "Física",
    cid: "M20.1",
    necessidadesEspeciais: "Necessita de rampa de acesso e elevador",
  },
  withoutDisability: {
    possuiDeficiencia: false,
  },
};

/**
 * Step 6: Transport Voucher Data
 */
export const transportDataTestData = {
  withTransport: {
    necessitaValeTransporte: true,
    linhas: [
      {
        id: randomUUID(),
        tipo: "Ônibus",
        linha: "875M-10",
        tarifa: "4.40",
      },
      {
        id: randomUUID(),
        tipo: "Metrô",
        linha: "Linha Vermelha",
        tarifa: "4.40",
      },
    ],
  },
  withoutTransport: {
    necessitaValeTransporte: false,
    linhas: [],
  },
};

/**
 * Step 7: Foreigner Data
 */
export const foreignerDataTestData = {
  foreigner: {
    estrangeiro: true,
    numeroPassaporte: "AB123456",
    tipoVisto: "Permanente",
    validadeVisto: "2030-12-31",
    paisOrigem: "Portugal",
  },
  brazilian: {
    estrangeiro: false,
  },
};

/**
 * Step 8: Apprentice Data
 */
export const apprenticeDataTestData = {
  apprentice: {
    aprendiz: true,
    instituicaoEnsino: "SENAI São Paulo",
    curso: "Técnico em Desenvolvimento de Sistemas",
    horarioAulas: "19:00-22:00",
  },
  notApprentice: {
    aprendiz: false,
  },
};

/**
 * Step 9: Bank Data
 */
export const bankDataTestData = {
  valid: {
    nomeBanco: "Banco do Brasil",
    codigoBanco: "001",
    agencia: "1234-5",
    numeroConta: "12345678-9",
    tipoConta: "corrente" as const,
    chavePix: "joao.santos@example.com",
  },
  savings: {
    nomeBanco: "Caixa Econômica Federal",
    codigoBanco: "104",
    agencia: "5678",
    numeroConta: "98765432-1",
    tipoConta: "poupanca" as const,
    chavePix: generateValidCPF(),
  },
};

/**
 * Step 10: Document Upload - Mock file data
 */
export const documentTestData = {
  rg: {
    name: "rg-frente.pdf",
    type: "application/pdf",
    size: 1024 * 500, // 500KB
  },
  cpf: {
    name: "cpf.pdf",
    type: "application/pdf",
    size: 1024 * 300, // 300KB
  },
  certidaoNascimento: {
    name: "certidao-nascimento.jpg",
    type: "image/jpeg",
    size: 1024 * 800, // 800KB
  },
  comprovanteResidencia: {
    name: "comprovante-residencia.pdf",
    type: "application/pdf",
    size: 1024 * 400, // 400KB
  },
  ctps: {
    name: "ctps.pdf",
    type: "application/pdf",
    size: 1024 * 600, // 600KB
  },
};

/**
 * Complete onboarding flow data - all steps combined
 */
export const completeOnboardingData = {
  step1: personalDataTestData.valid,
  step2: { dependentes: dependentsTestData.valid },
  step3: addressTestData.valid,
  step4: contractDataTestData.valid,
  step5: disabilityDataTestData.withoutDisability,
  step6: transportDataTestData.withTransport,
  step7: foreignerDataTestData.brazilian,
  step8: apprenticeDataTestData.notApprentice,
  step9: bankDataTestData.valid,
};

/**
 * API Response Mock Data
 */
export const mockApiResponses = {
  colaborador: {
    success: true,
    data: {
      id: "collab-123456",
      nomeCompleto: "João Pedro da Silva Santos",
      cpf: "123.456.789-09",
      email: "joao.santos@example.com",
      stepAtual: 1,
      stepsCompletos: [],
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    message: "Colaborador encontrado com sucesso",
  },
  submitSuccess: {
    success: true,
    data: {
      id: "collab-123456",
      nomeCompleto: "João Pedro da Silva Santos",
      cpf: "123.456.789-09",
      email: "joao.santos@example.com",
      stepAtual: 2,
      stepsCompletos: [1],
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    message: "Dados salvos com sucesso",
  },
  submitError: {
    success: false,
    message: "Erro ao salvar dados",
    errors: ["CPF inválido", "Campo obrigatório não preenchido"],
    statusCode: 400,
  },
  documentUploadSuccess: {
    success: true,
    data: {
      id: "doc-123456",
      nome: "rg-frente.pdf",
      tipo: "RG",
      url: "https://storage.example.com/documents/rg-123456.pdf",
      stepId: 1,
      status: "uploaded" as const,
      uploadedAt: "2025-01-01T12:00:00Z",
    },
    message: "Documento enviado com sucesso",
  },
  cepValidation: {
    success: true,
    data: {
      cep: "01310-100",
      logradouro: "Avenida Paulista",
      numero: "",
      complemento: "",
      bairro: "Bela Vista",
      cidade: "São Paulo",
      estado: "SP",
    },
    message: "CEP validado com sucesso",
  },
};

/**
 * Helper function to create a mock File object for testing
 */
export function createMockFile(
  name: string,
  type: string,
  size: number
): File {
  const content = "a".repeat(size);
  const blob = new Blob([content], { type });
  return new File([blob], name, { type });
}

/**
 * Helper function to generate test email
 */
export function generateTestEmail(prefix = "test"): string {
  const timestamp = Date.now();
  return `${prefix}.${timestamp}@torra-test.com`;
}

/**
 * Helper function to get a date N years ago from today
 */
export function getDateYearsAgo(years: number): string {
  const date = new Date();
  date.setFullYear(date.getFullYear() - years);
  return date.toISOString().split("T")[0];
}

/**
 * Helper function to get a date N days from today
 */
export function getDateDaysFromNow(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}
