import { z } from 'zod';

// Helper functions for Brazilian validations
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
const cepRegex = /^\d{5}-\d{3}$/;

// Step 1 - Personal Data
export const personalDataSchema = z.object({
  fullName: z.string().min(3, 'Name must have at least 3 characters'),
  cpf: z.string().regex(cpfRegex, 'Invalid CPF format (000.000.000-00)'),
  rg: z.string().min(5, 'Invalid RG'),
  birthDate: z.string().min(1, 'Birth date is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().regex(phoneRegex, 'Invalid phone format'),
  maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed', 'stable_union']),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_say']),
  nationality: z.string().min(1, 'Nationality is required'),
});

// Step 2 - Dependents
export const dependentSchema = z.object({
  id: z.string(),
  name: z.string().min(3, 'Name must have at least 3 characters'),
  cpf: z.string().regex(cpfRegex, 'Invalid CPF format'),
  birthDate: z.string().min(1, 'Birth date is required'),
  relationship: z.enum(['spouse', 'child', 'parent', 'other']),
});

export const dependentsSchema = z.object({
  dependents: z.array(dependentSchema),
});

// Step 3 - Address
export const addressSchema = z.object({
  zipCode: z.string().regex(cepRegex, 'Invalid ZIP code format (00000-000)'),
  street: z.string().min(3, 'Street is required'),
  number: z.string().min(1, 'Number is required'),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, 'Neighborhood is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().length(2, 'State must be 2 characters (e.g., SP)'),
});

// Step 4 - Contract Data
export const contractDataSchema = z.object({
  position: z.string().min(2, 'Position is required'),
  department: z.string().min(2, 'Department is required'),
  admissionDate: z.string().min(1, 'Admission date is required'),
  salary: z.string().min(1, 'Salary is required'),
  workSchedule: z.string().min(1, 'Work schedule is required'),
  contractType: z.enum(['clt', 'pj', 'temporary', 'apprentice', 'intern']),
});

// Step 5 - Disability Data
export const disabilityDataSchema = z.object({
  hasDisability: z.boolean(),
  type: z.string().optional(),
  cid: z.string().optional(),
  needs: z.string().optional(),
}).refine(
  (data) => {
    if (data.hasDisability) {
      return data.type && data.type.length > 0;
    }
    return true;
  },
  {
    message: 'Disability type is required when has disability',
    path: ['type'],
  }
);

// Step 6 - Transport Voucher
export const transportLineSchema = z.object({
  id: z.string(),
  type: z.enum(['bus', 'subway', 'train', 'ferry']),
  line: z.string().min(1, 'Line name is required'),
  fare: z.string().min(1, 'Fare is required'),
});

export const transportDataSchema = z.object({
  needsTransportVoucher: z.boolean(),
  lines: z.array(transportLineSchema).optional(),
}).refine(
  (data) => {
    if (data.needsTransportVoucher) {
      return data.lines && data.lines.length > 0;
    }
    return true;
  },
  {
    message: 'At least one transport line is required',
    path: ['lines'],
  }
);

// Step 7 - Foreigner Data
export const foreignerDataSchema = z.object({
  isForeigner: z.boolean(),
  passportNumber: z.string().optional(),
  visaType: z.string().optional(),
  visaExpiry: z.string().optional(),
  countryOfOrigin: z.string().optional(),
}).refine(
  (data) => {
    if (data.isForeigner) {
      return data.passportNumber && data.visaType && data.countryOfOrigin;
    }
    return true;
  },
  {
    message: 'Foreigner information is required',
    path: ['passportNumber'],
  }
);

// Step 8 - Apprentice Data
export const apprenticeDataSchema = z.object({
  isApprentice: z.boolean(),
  institution: z.string().optional(),
  course: z.string().optional(),
  schedule: z.string().optional(),
}).refine(
  (data) => {
    if (data.isApprentice) {
      return data.institution && data.course && data.schedule;
    }
    return true;
  },
  {
    message: 'Apprentice information is required',
    path: ['institution'],
  }
);

// Step 9 - Bank Data
export const bankDataSchema = z.object({
  bankName: z.string().min(1, 'Bank name is required'),
  bankCode: z.string().min(1, 'Bank code is required'),
  agency: z.string().min(1, 'Agency is required'),
  accountNumber: z.string().min(1, 'Account number is required'),
  accountType: z.enum(['checking', 'savings']),
  pixKey: z.string().optional(),
});

// Document schema
export const documentSchema = z.object({
  id: z.string(),
  stepId: z.number(),
  name: z.string(),
  type: z.string(),
  url: z.string().url().optional(),
  status: z.enum(['pending', 'uploaded', 'approved', 'rejected']),
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