"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { ApprenticeForm } from "@/components/ui/apprentice-form";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Header } from "@/components/ui/header";
import { Stepper } from "@/components/ui/stepper";
import type { ApprenticeFormData } from "@/types/apprentice";

export default function OnboardingStep8() {
  const [formData, setFormData] = useState<ApprenticeFormData>({
    isApprentice: "",
    modoContratacao: "",
    cnpjEntidadeQualificadora: "",
    cnpjExercicioAtividades: "",
    localPessoaJuridica: "",
  });

  const handleFormUpdate = useCallback((data: ApprenticeFormData) => {
    setFormData(data);
  }, []);

  const handleSave = () => {
    console.log("Saving apprentice data:", formData);
  };

  const canProceed = () => {
    if (formData.isApprentice === "nao") {
      return true;
    }

    if (formData.isApprentice === "sim") {
      return (
        formData.modoContratacao !== "" &&
        formData.cnpjEntidadeQualificadora.trim() !== "" &&
        formData.cnpjExercicioAtividades.trim() !== ""
      );
    }

    return false;
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] animate-fade-in">
      <Header />
      <Breadcrumb currentPage="Admissão" />

      {/* Stepper */}
      <Stepper currentStep={8} totalSteps={10} />

      {/* Main Content */}
      <main className="w-full max-w-[1144px] mx-auto px-8 mt-6">
        {/* Form Section */}
        <div className="mb-6">
          <ApprenticeForm onUpdate={handleFormUpdate} />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end mb-10">
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-4 bg-[#37375B] text-white text-sm rounded hover:bg-[#2a2a4a] transition-all duration-200 min-w-[107px] hover:shadow-lg active:scale-[0.98]"
          >
            Salvar
          </button>

          <Link
            href="/onboarding/9"
            className={`px-6 py-4 text-white text-sm rounded transition-all duration-200 text-center min-w-[107px] flex items-center justify-center hover:shadow-lg active:scale-[0.98] ${
              canProceed()
                ? "bg-[#FF5101] hover:bg-[#e8450a]"
                : "bg-[#AAAAAA] pointer-events-none"
            }`}
          >
            Próximo
          </Link>
        </div>
      </main>
    </div>
  );
}
