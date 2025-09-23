"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { BankingForm } from "@/components/ui/banking-form";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Header } from "@/components/ui/header";
import { Stepper } from "@/components/ui/stepper";
import type { BankingFormData } from "@/types/banking";

export default function OnboardingStep9() {
  const [formData, setFormData] = useState<BankingFormData>({
    isItauCustomer: "",
    agenciaBancaria: "",
    tipoConta: "",
    numeroConta: "",
    digito: "",
  });

  const handleFormUpdate = useCallback((data: BankingFormData) => {
    setFormData(data);
  }, []);

  const handleSave = () => {
    console.log("Saving banking data:", formData);
  };

  const canProceed = () => {
    if (formData.isItauCustomer === "nao") {
      return true;
    }

    if (formData.isItauCustomer === "sim") {
      return (
        formData.agenciaBancaria.trim() !== "" &&
        formData.numeroConta.trim() !== "" &&
        formData.digito.trim() !== ""
      );
    }

    return false;
  };

  return (
    <div className="min-h-screen bg-neutral-bg animate-fade-in">
      <Header />
      <Breadcrumb currentPage="Admissão" />

      {/* Stepper */}
      <Stepper currentStep={9} totalSteps={10} />

      {/* Main Content */}
      <main className="w-full max-w-[1144px] mx-auto px-8 mt-6">
        {/* Form Section */}
        <div className="mb-6">
          <BankingForm onUpdate={handleFormUpdate} />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end mb-10">
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-4 bg-torra-dark-blue text-white text-sm rounded hover:bg-blue-800 transition-all duration-200 min-w-[107px] hover:shadow-lg active:scale-[0.98]"
          >
            Salvar
          </button>

          <Link
            href="/onboarding/10"
            className={`px-6 py-4 text-white text-sm rounded transition-all duration-200 text-center min-w-[107px] flex items-center justify-center hover:shadow-lg active:scale-[0.98] ${
              canProceed()
                ? "bg-torra-orange hover:bg-orange-600"
                : "bg-neutral-04 pointer-events-none"
            }`}
          >
            Próximo
          </Link>
        </div>
      </main>
    </div>
  );
}
