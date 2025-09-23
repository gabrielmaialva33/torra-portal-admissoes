"use client";

import React from "react";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

const stepTitles = [
  "Dados Gerais",
  "Endereço",
  "Contatos de Emergência",
  "Dados Bancários",
  "Dependentes",
  "Benefícios",
  "Documentação",
  "Experiência Profissional",
  "Formação Acadêmica",
  "Revisão",
];

export function Stepper({ currentStep, totalSteps }: StepperProps) {
  return (
    <div className="bg-[#F8F8F8] py-7">
      <div className="max-w-[948px] mx-auto">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }, (_, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === currentStep;
              const isPast = stepNumber < currentStep;

              return (
                <React.Fragment key={stepNumber}>
                  {/* Step Box with border for active state */}
                  <div className="relative">
                    {isActive && (
                      <div className="absolute -inset-[5px] rounded-[4px] bg-[rgba(255,81,1,0.2)]" />
                    )}
                    <div
                      className={`
                        relative w-[30px] h-[30px] rounded-[4px] flex items-center justify-center
                        ${
                          isActive || isPast
                            ? "bg-[#FF5101]"
                            : "border border-[#D6D6D6] bg-white"
                        }
                      `}
                    >
                      <div
                        className={`
                          w-[10px] h-[10px] rounded-[2px]
                          ${isActive || isPast ? "bg-white" : "bg-[#D6D6D6]"}
                        `}
                      />
                    </div>
                  </div>

                  {/* Connecting Line */}
                  {stepNumber < totalSteps && (
                    <div className="w-[60px] h-[2px]">
                      {isPast ? (
                        <div className="w-full h-full bg-[#FF5101]" />
                      ) : stepNumber === currentStep ? (
                        <div className="flex">
                          <div className="w-[30px] h-full bg-[#FF5101]" />
                          <div className="w-[30px] h-full bg-[#D6D6D6]" />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-[#D6D6D6]" />
                      )}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Step Info */}
        <div className="text-center mt-5">
          <p className="text-[10px] text-[#5F5F5F] leading-[14px]">Passo {currentStep}</p>
          <p className="text-[14px] text-[#5F5F5F] leading-[16px]">
            {stepTitles[currentStep - 1]}
          </p>
        </div>
      </div>
    </div>
  );
}
