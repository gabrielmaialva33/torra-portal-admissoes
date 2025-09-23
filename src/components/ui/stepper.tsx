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
        <div className="flex items-start justify-center">
          <div className="flex items-start gap-2">
            {Array.from({ length: totalSteps }, (_, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === currentStep;
              const isPast = stepNumber < currentStep;

              return (
                <React.Fragment key={stepNumber}>
                  {/* Step with title below */}
                  <div className="flex flex-col items-center">
                    {/* Step Box with border for active state */}
                    <div className="relative">
                      {isActive && (
                        <div className="absolute -inset-[5px] rounded-[4px] bg-[rgba(255,81,1,0.2)] z-0" />
                      )}
                      <div
                        className={`
                          relative w-[30px] h-[30px] rounded-[4px] flex items-center justify-center z-10
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

                    {/* Step Info below each step */}
                    <div className="text-center mt-3 w-[80px]">
                      {isActive && (
                        <>
                          <p className="text-[10px] text-[#5F5F5F] leading-[14px] font-bold">
                            Passo {stepNumber}
                          </p>
                          <p className="text-[12px] text-[#5F5F5F] leading-[14px] break-words">
                            {stepTitles[stepNumber - 1]}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Connecting Line */}
                  {stepNumber < totalSteps && (
                    <div className="w-[60px] h-[2px] mt-[14px]">
                      {isPast || isActive ? (
                        <div className="w-full h-full bg-[#FF5101]" />
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
      </div>
    </div>
  );
}
