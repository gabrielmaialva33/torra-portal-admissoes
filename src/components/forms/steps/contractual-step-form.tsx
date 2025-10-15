"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContractualForm } from "@/components/ui/contractual-form";
import { useOnboardingStore } from "@/stores/onboarding-store";
import type { ContractualFormData } from "@/types/contractual";

export function ContractualStepForm() {
  const router = useRouter();
  const { formData, updateFormData, markStepComplete, setCurrentStep } =
    useOnboardingStore();

  const [contractualData, setContractualData] = useState<ContractualFormData>({
    primeiroEmprego: "",
    numeroPIS: "",
    numeroCNH: "",
    dataVencimentoCNH: "",
    comprovantePIS: null,
    ...formData.contractual,
  });

  const handleNext = () => {
    updateFormData("contractual", contractualData);
    markStepComplete(4);
    setCurrentStep(5);
    router.push("/onboarding/5");
  };

  const handleSave = () => {
    updateFormData("contractual", contractualData);
    alert("Dados salvos com sucesso!");
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-8">
          <h2 className="text-xl font-medium text-[#37375B] mb-6">
            Dados Contratuais
          </h2>

          <ContractualForm onUpdate={setContractualData} />

          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/onboarding/3")}
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
