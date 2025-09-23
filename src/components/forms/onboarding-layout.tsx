"use client";

import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Header } from "@/components/ui/header";
import { StepIndicator } from "@/components/ui/step-indicator";
import { useOnboardingStore } from "@/stores/onboarding-store";

const ONBOARDING_STEPS = [
  { id: 1, title: "Dados Gerais", description: "Informações básicas" },
  { id: 2, title: "Dependentes", description: "Membros da família" },
  { id: 3, title: "Endereço", description: "Informações residenciais" },
  { id: 4, title: "Dados Contratuais", description: "Detalhes do contrato" },
  { id: 5, title: "Dados PCD", description: "Informações sobre deficiência" },
  { id: 6, title: "Vale Transporte", description: "Benefício de transporte" },
  {
    id: 7,
    title: "Dados Estrangeiro",
    description: "Informações de imigração",
  },
  { id: 8, title: "Dados Aprendiz", description: "Informações educacionais" },
  { id: 9, title: "Dados Bancários", description: "Informações bancárias" },
  { id: 10, title: "Finalização", description: "Revisar e enviar" },
];

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  onNext?: () => void;
  onPrevious?: () => void;
  isNextDisabled?: boolean;
  isPreviousDisabled?: boolean;
}

export function OnboardingLayout({
  children,
  currentStep,
  onNext,
  onPrevious,
  isNextDisabled: _isNextDisabled = false,
  isPreviousDisabled: _isPreviousDisabled = false,
}: OnboardingLayoutProps) {
  const router = useRouter();
  const { completedSteps, setCurrentStep } = useOnboardingStore();

  const _handleNext = () => {
    if (onNext) {
      onNext();
    } else if (currentStep < ONBOARDING_STEPS.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      router.push(`/onboarding/${nextStep}`);
    }
  };

  const _handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    } else if (currentStep > 1) {
      const previousStep = currentStep - 1;
      setCurrentStep(previousStep);
      router.push(`/onboarding/${previousStep}`);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-bg">
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <Breadcrumb currentPage="Admissão" />

      {/* Step Indicator */}
      <StepIndicator
        currentStep={currentStep}
        completedSteps={completedSteps}
        totalSteps={ONBOARDING_STEPS.length}
      />

      {/* Main Content */}
      <main className="container mx-auto px-8 pb-8">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
