"use client";

import { useOnboardingStore } from "@/stores/onboarding-store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Header } from "@/components/ui/header";
import { Breadcrumb } from "@/components/ui/breadcrumb";

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
  isNextDisabled = false,
  isPreviousDisabled = false,
}: OnboardingLayoutProps) {
  const router = useRouter();
  const { completedSteps, setCurrentStep } = useOnboardingStore();

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else if (currentStep < ONBOARDING_STEPS.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      router.push(`/onboarding/${nextStep}`);
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    } else if (currentStep > 1) {
      const previousStep = currentStep - 1;
      setCurrentStep(previousStep);
      router.push(`/onboarding/${previousStep}`);
    }
  };

  const currentStepData = ONBOARDING_STEPS[currentStep - 1];

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <Breadcrumb currentPage="Admissão" />

      {/* Step Indicator */}
      <div className="bg-[#F8F8F8] py-6">
        <div className="container mx-auto px-8">
          <div className="flex flex-col items-center">
            {/* Steps Bar */}
            <div className="flex items-center gap-2">
              {ONBOARDING_STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded flex items-center justify-center text-xs font-semibold transition-all
                      ${
                        currentStep === step.id
                          ? "bg-primary text-white ring-4 ring-primary/20"
                          : completedSteps.includes(step.id)
                            ? "bg-green-500 text-white"
                            : "bg-white border border-gray-300 text-gray-400"
                      }
                    `}
                  >
                    {completedSteps.includes(step.id) ? "✓" : ""}
                  </div>
                  {index < ONBOARDING_STEPS.length - 1 && (
                    <div
                      className={`w-16 h-0.5 ${
                        completedSteps.includes(step.id)
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step Title */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">Passo {currentStep}</p>
              <h2 className="text-sm font-medium text-gray-700 mt-1">
                {currentStepData?.title}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-8 pb-8">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
