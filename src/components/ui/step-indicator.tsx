"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  completedSteps: number[];
  totalSteps?: number;
}

export function StepIndicator({
  currentStep,
  completedSteps,
  totalSteps = 10,
}: StepIndicatorProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="w-full bg-neutral-bg py-8">
      <div className="max-w-[1200px] mx-auto px-8">
        {/* Step Progress Bar */}
        <div className="flex items-center justify-center mb-6">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              {/* Step Square */}
              <div
                className={cn(
                  "relative w-8 h-8 rounded flex items-center justify-center transition-all",
                  step === currentStep
                    ? "bg-torra-orange"
                    : completedSteps.includes(step)
                      ? "bg-torra-orange"
                      : "bg-neutral-01 border border-neutral-03",
                )}
              >
                {/* Inner Square/Number */}
                {completedSteps.includes(step) ? (
                  <Check className="w-4 h-4 text-neutral-01" strokeWidth={3} />
                ) : step === currentStep ? (
                  <div className="w-2 h-2 rounded-sm bg-neutral-01" />
                ) : (
                  <span className="text-xs text-neutral-04 font-medium">
                    {step}
                  </span>
                )}
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-[72px] h-[2px]",
                    step < currentStep || completedSteps.includes(step + 1)
                      ? "bg-torra-orange"
                      : "bg-neutral-03",
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Label */}
        <div className="text-center">
          <p className="text-xs text-neutral-05 mb-1 font-normal">
            Passo {currentStep}
          </p>
          <h2 className="text-lg text-torra-dark-blue font-semibold">
            {getStepName(currentStep)}
          </h2>
        </div>
      </div>
    </div>
  );
}

function getStepName(step: number): string {
  const stepNames: Record<number, string> = {
    1: "Dados Gerais",
    2: "Dependentes",
    3: "Endereço",
    4: "Dados Contratuais",
    5: "Dados PCD",
    6: "Vale Transporte",
    7: "Dados Estrangeiro",
    8: "Dados Aprendiz",
    9: "Dados Bancários",
    10: "Finalização",
  };

  return stepNames[step] || "";
}
