"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DependentForm } from "@/components/ui/dependent-form";
import { useOnboardingStore } from "@/stores/onboarding-store";
import type { Dependent, DependentFormData } from "@/types/dependent";

export function DependentsStepForm() {
  const router = useRouter();
  const { formData, updateFormData, markStepComplete, setCurrentStep } =
    useOnboardingStore();

  const [dependents, setDependents] = useState<Dependent[]>(
    formData.dependents || [],
  );

  const [currentDependent, setCurrentDependent] =
    useState<DependentFormData | null>(null);

  const handleAddDependent = () => {
    if (currentDependent) {
      const newDependent: Dependent = {
        id: crypto.randomUUID(),
        ...currentDependent,
      };
      setDependents([...dependents, newDependent]);
      setCurrentDependent(null);
    }
  };

  const handleRemoveDependent = (id: string) => {
    setDependents(dependents.filter((dep) => dep.id !== id));
  };

  const handleNext = () => {
    updateFormData("dependents", dependents);
    markStepComplete(2);
    setCurrentStep(3);
    router.push("/onboarding/3");
  };

  const handleSave = () => {
    updateFormData("dependents", dependents);
    alert("Dados salvos com sucesso!");
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-8">
          <h2 className="text-xl font-medium text-[#37375B] mb-6">
            Dependentes
          </h2>

          {/* List existing dependents */}
          {dependents.map((dependent) => (
            <div key={dependent.id} className="mb-8">
              <DependentForm
                dependent={dependent}
                onUpdate={() => {}}
                onRemove={() => handleRemoveDependent(dependent.id)}
              />
            </div>
          ))}

          {/* Add new dependent form */}
          <div className="mb-6">
            <DependentForm
              onUpdate={(data) => setCurrentDependent(data)}
              className="border-t pt-6"
            />
            <Button
              type="button"
              onClick={handleAddDependent}
              className="mt-4 bg-torra-orange text-white hover:bg-torra-orange/90"
            >
              + Adicionar Dependente
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/onboarding/1")}
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
