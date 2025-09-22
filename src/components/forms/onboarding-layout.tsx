"use client";

import { useOnboardingStore } from "@/stores/onboarding-store";
import { Stepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const ONBOARDING_STEPS = [
  { id: 1, title: "Personal Data", description: "Basic information" },
  { id: 2, title: "Dependents", description: "Family members" },
  { id: 3, title: "Address", description: "Residential information" },
  { id: 4, title: "Contract", description: "Employment details" },
  { id: 5, title: "Disability", description: "PCD information" },
  { id: 6, title: "Transport", description: "Transport voucher" },
  { id: 7, title: "Foreigner", description: "Immigration data" },
  { id: 8, title: "Apprentice", description: "Education info" },
  { id: 9, title: "Bank", description: "Banking details" },
  { id: 10, title: "Finish", description: "Review and submit" },
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

  const progress = (completedSteps.length / ONBOARDING_STEPS.length) * 100;

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
    router.push(`/onboarding/${stepId}`);
  };

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">
                Portal Torra Admissions
              </h1>
              <p className="text-sm text-muted-foreground">
                Employee Onboarding System
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {ONBOARDING_STEPS.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="border-b bg-card/50">
        <div className="container mx-auto px-4 py-2">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Stepper */}
      <div className="border-b bg-card/30">
        <div className="container mx-auto px-4 py-6">
          <Stepper
            steps={ONBOARDING_STEPS}
            currentStep={currentStep}
            completedSteps={completedSteps}
            onStepClick={handleStepClick}
            orientation="horizontal"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>

      {/* Navigation Footer */}
      <footer className="sticky bottom-0 border-t bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1 || isPreviousDisabled}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {completedSteps.length} of {ONBOARDING_STEPS.length} completed
              </span>
            </div>

            <Button
              onClick={handleNext}
              disabled={currentStep === ONBOARDING_STEPS.length || isNextDisabled}
            >
              {currentStep === ONBOARDING_STEPS.length ? "Submit" : "Next"}
              {currentStep !== ONBOARDING_STEPS.length && (
                <ArrowRight className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}