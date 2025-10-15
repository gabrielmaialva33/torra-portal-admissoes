"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BankingForm } from "@/components/ui/banking-form";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/stores/onboarding-store";
import type { BankingFormData } from "@/types/banking";

export function BankingStepForm() {
  const router = useRouter();
  const { formData, updateFormData, markStepComplete, setCurrentStep } =
    useOnboardingStore();

  const [bankingData, setBankingData] = useState<BankingFormData>({
    isItauCustomer: "",
    agenciaBancaria: "",
    tipoConta: "",
    numeroConta: "",
    digito: "",
    ...formData.banking,
  });

  const handleNext = () => {
    updateFormData("banking", bankingData);
    markStepComplete(9);
    setCurrentStep(10);
    router.push("/onboarding/10");
  };

  const handleSave = () => {
    updateFormData("banking", bankingData);
    alert("Dados salvos com sucesso!");
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-8">
          <h2 className="text-xl font-medium text-[#37375B] mb-6">
            Dados Bancários
          </h2>

          <BankingForm onUpdate={setBankingData} />

          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/onboarding/8")}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Voltar
            </Button>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleSave}
                className="bg-torra-dark-blue text-white hover:bg-torra-dark-blue/90"
              >
                Salvar
              </Button>
              <Button
                type="button"
                onClick={handleNext}
                className="bg-torra-orange text-white hover:bg-torra-orange/90"
              >
                Próximo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
