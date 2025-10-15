import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AddressFormData } from "@/types/address";
import type { ApprenticeFormData } from "@/types/apprentice";
import type { BankingFormData } from "@/types/banking";
import type { ContractualFormData } from "@/types/contractual";
import type { Dependent } from "@/types/dependent";
import type { ForeignerFormData } from "@/types/foreigner";
import type { PCDFormData } from "@/types/pcd";
import type { TransportFormData } from "@/types/transport";

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

export interface OnboardingDocument {
  id: string;
  stepId: number;
  name: string;
  type: string;
  url?: string;
  status: "pending" | "uploaded" | "approved" | "rejected";
  rejectionReason?: string;
  uploadedAt?: string;
}

interface OnboardingState {
  currentStep: number;
  completedSteps: number[];
  formData: {
    personalData: Partial<PersonalData>;
    dependents: Dependent[];
    address: Partial<AddressFormData>;
    contractual: Partial<ContractualFormData>;
    pcd: Partial<PCDFormData>;
    transport: Partial<TransportFormData>;
    foreigner: Partial<ForeignerFormData>;
    apprentice: Partial<ApprenticeFormData>;
    banking: Partial<BankingFormData>;
  };
  documents: OnboardingDocument[];

  // Actions
  setCurrentStep: (step: number) => void;
  updateFormData: <K extends keyof OnboardingState["formData"]>(
    step: K,
    data: OnboardingState["formData"][K],
  ) => void;
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
    contractual: {},
    pcd: {},
    transport: {},
    foreigner: {},
    apprentice: {},
    banking: {},
  },
  documents: [],
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrentStep: (step) => set({ currentStep: step }),

      updateFormData: <K extends keyof OnboardingState["formData"]>(
        stepKey: K,
        data: OnboardingState["formData"][K],
      ) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [stepKey]: data as OnboardingState["formData"][K],
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
            doc.id === id ? { ...doc, ...updates } : doc,
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
      name: "torra-onboarding",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
