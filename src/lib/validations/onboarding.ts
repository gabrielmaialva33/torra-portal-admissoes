import { z } from "zod";

// Helper functions for Brazilian validations
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
const cepRegex = /^\d{5}-\d{3}$/;

// Step 1 - Personal Data
export const personalDataSchema = z.object({
  fullName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  cpf: z.string().regex(cpfRegex, "Formato de CPF inválido (000.000.000-00)"),
  rg: z.string().min(5, "RG inválido"),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
  email: z.string().email("Email inválido"),
  phone: z.string().regex(phoneRegex, "Formato de telefone inválido"),
  maritalStatus: z.enum([
    "single",
    "married",
    "divorced",
    "widowed",
    "stable_union",
  ]),
  gender: z.enum(["male", "female", "other", "prefer_not_say"]),
  nationality: z.string().min(1, "Nacionalidade é obrigatória"),
});

// Step 2 - Dependents
export const dependentSchema = z.object({
  id: z.string(),
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  cpf: z.string().regex(cpfRegex, "Formato de CPF inválido"),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
  relationship: z.enum(["spouse", "child", "parent", "other"]),
});

export const dependentsSchema = z.object({
  dependents: z.array(dependentSchema),
});

// Step 3 - Address
export const addressSchema = z.object({
  zipCode: z.string().regex(cepRegex, "Formato de CEP inválido (00000-000)"),
  street: z.string().min(3, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, "Bairro é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  state: z.string().length(2, "Estado deve ter 2 caracteres (ex: SP)"),
});

// Step 4 - Contract Data
export const contractDataSchema = z.object({
  position: z.string().min(2, "Cargo é obrigatório"),
  department: z.string().min(2, "Departamento é obrigatório"),
  admissionDate: z.string().min(1, "Data de admissão é obrigatória"),
  salary: z.string().min(1, "Salário é obrigatório"),
  workSchedule: z.string().min(1, "Horário de trabalho é obrigatório"),
  contractType: z.enum(["clt", "pj", "temporary", "apprentice", "intern"]),
});

// Step 5 - Disability Data
export const disabilityDataSchema = z
  .object({
    hasDisability: z.boolean(),
    type: z.string().optional(),
    cid: z.string().optional(),
    needs: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.hasDisability) {
        return data.type && data.type.length > 0;
      }
      return true;
    },
    {
      message: "Tipo de deficiência é obrigatório quando possui deficiência",
      path: ["type"],
    },
  );

// Step 6 - Transport Voucher
export const transportLineSchema = z.object({
  id: z.string(),
  type: z.enum(["bus", "subway", "train", "ferry"]),
  line: z.string().min(1, "Nome da linha é obrigatório"),
  fare: z.string().min(1, "Valor da tarifa é obrigatório"),
});

export const transportDataSchema = z
  .object({
    needsTransportVoucher: z.boolean(),
    lines: z.array(transportLineSchema).optional(),
  })
  .refine(
    (data) => {
      if (data.needsTransportVoucher) {
        return data.lines && data.lines.length > 0;
      }
      return true;
    },
    {
      message: "Pelo menos uma linha de transporte é obrigatória",
      path: ["lines"],
    },
  );

// Step 7 - Foreigner Data
export const foreignerDataSchema = z
  .object({
    isForeigner: z.boolean(),
    passportNumber: z.string().optional(),
    visaType: z.string().optional(),
    visaExpiry: z.string().optional(),
    countryOfOrigin: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.isForeigner) {
        return data.passportNumber && data.visaType && data.countryOfOrigin;
      }
      return true;
    },
    {
      message: "Informações de estrangeiro são obrigatórias",
      path: ["passportNumber"],
    },
  );

// Step 8 - Apprentice Data
export const apprenticeDataSchema = z
  .object({
    isApprentice: z.boolean(),
    institution: z.string().optional(),
    course: z.string().optional(),
    schedule: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.isApprentice) {
        return data.institution && data.course && data.schedule;
      }
      return true;
    },
    {
      message: "Informações de aprendiz são obrigatórias",
      path: ["institution"],
    },
  );

// Step 9 - Bank Data
export const bankDataSchema = z.object({
  bankName: z.string().min(1, "Nome do banco é obrigatório"),
  bankCode: z.string().min(1, "Código do banco é obrigatório"),
  agency: z.string().min(1, "Agência é obrigatória"),
  accountNumber: z.string().min(1, "Número da conta é obrigatório"),
  accountType: z.enum(["checking", "savings"]),
  pixKey: z.string().optional(),
});

// Document schema
export const documentSchema = z.object({
  id: z.string(),
  stepId: z.number(),
  name: z.string(),
  type: z.string(),
  url: z.string().url().optional(),
  status: z.enum(["pending", "uploaded", "approved", "rejected"]),
  rejectionReason: z.string().optional(),
  uploadedAt: z.string().optional(),
});

// Complete onboarding schema
export const completeOnboardingSchema = z.object({
  personalData: personalDataSchema,
  dependents: z.array(dependentSchema),
  address: addressSchema,
  contractData: contractDataSchema,
  disabilityData: disabilityDataSchema,
  transportData: transportDataSchema,
  foreignerData: foreignerDataSchema,
  apprenticeData: apprenticeDataSchema,
  bankData: bankDataSchema,
  documents: z.array(documentSchema),
});
