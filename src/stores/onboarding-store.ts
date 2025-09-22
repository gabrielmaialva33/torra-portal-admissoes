import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface PersonalData {
  fullName: string;
  cpf: string;
  rg: string;
  birthDate: string;
  email: string;
  phone: string;
  maritalStatus: string;
  gender: string;
  nationality: string;
}

export interface Dependent {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  relationship: string;
}

export interface Address {
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface ContractData {
  position: string;
  department: string;
  admissionDate: string;
  salary: string;
  workSchedule: string;
  contractType: string;
}

export interface DisabilityData {
  hasDisability: boolean;
  type?: string;
  cid?: string;
  needs?: string;
}

export interface TransportData {
  needsTransportVoucher: boolean;
  lines?: Array<{
    id: string;
    type: string;
    line: string;
    fare: string;
  }>;
}

export interface ForeignerData {
  isForeigner: boolean;
  passportNumber?: string;
  visaType?: string;
  visaExpiry?: string;
  countryOfOrigin?: string;
}

export interface ApprenticeData {
  isApprentice: boolean;
  institution?: string;
  course?: string;
  schedule?: string;
}

export interface BankData {
  bankName: string;
  bankCode: string;
  agency: string;
  accountNumber: string;
  accountType: 'checking' | 'savings';
  pixKey?: string;
}

export interface OnboardingDocument {
  id: string;
  stepId: number;
  name: string;
  type: string;
  url?: string;
  status: 'pending' | 'uploaded' | 'approved' | 'rejected';
  rejectionReason?: string;
  uploadedAt?: string;
}

interface OnboardingState {
  currentStep: number;
  completedSteps: number[];
  formData: {
    personalData: Partial<PersonalData>;
    dependents: Dependent[];
    address: Partial<Address>;
    contractData: Partial<ContractData>;
    disabilityData: Partial<DisabilityData>;
    transportData: Partial<TransportData>;
    foreignerData: Partial<ForeignerData>;
    apprenticeData: Partial<ApprenticeData>;
    bankData: Partial<BankData>;
  };
  documents: OnboardingDocument[];

  // Actions
  setCurrentStep: (step: number) => void;
  updateFormData: (step: keyof OnboardingState['formData'], data: any) => void;
  addDependent: (dependent: Dependent) => void;
  removeDependent: (id: string) => void;
  addDocument: (document: OnboardingDocument) => void;
  updateDocument: (id: string, updates: Partial<OnboardingDocument>) => void;
  markStepComplete: (step: number) => void;
  resetOnboarding: () => void;
  canAccessStep: (step: number) => boolean;
}

const initialState = {
  currentStep: 1,
  completedSteps: [],
  formData: {
    personalData: {},
    dependents: [],
    address: {},
    contractData: {},
    disabilityData: { hasDisability: false },
    transportData: { needsTransportVoucher: false },
    foreignerData: { isForeigner: false },
    apprenticeData: { isApprentice: false },
    bankData: {},
  },
  documents: [],
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrentStep: (step) => set({ currentStep: step }),

      updateFormData: (stepKey, data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [stepKey]: data,
          },
        })),

      addDependent: (dependent) =>
        set((state) => ({
          formData: {
            ...state.formData,
            dependents: [...state.formData.dependents, dependent],
          },
        })),

      removeDependent: (id) =>
        set((state) => ({
          formData: {
            ...state.formData,
            dependents: state.formData.dependents.filter((d) => d.id !== id),
          },
        })),

      addDocument: (document) =>
        set((state) => ({
          documents: [...state.documents, document],
        })),

      updateDocument: (id, updates) =>
        set((state) => ({
          documents: state.documents.map((doc) =>
            doc.id === id ? { ...doc, ...updates } : doc
          ),
        })),

      markStepComplete: (step) =>
        set((state) => ({
          completedSteps: [...new Set([...state.completedSteps, step])],
        })),

      resetOnboarding: () => set(initialState),

      canAccessStep: (step) => {
        const { completedSteps } = get();
        // Can always access step 1
        if (step === 1) return true;
        // Can access a step if the previous step is completed
        return completedSteps.includes(step - 1);
      },
    }),
    {
      name: 'torra-onboarding',
      storage: createJSONStorage(() => localStorage),
    }
  )
);