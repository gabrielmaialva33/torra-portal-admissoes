"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ContractualForm } from "@/components/ui/contractual-form";
import { ContractualUpload } from "@/components/ui/contractual-upload";
import { Header } from "@/components/ui/header";
import { Stepper } from "@/components/ui/stepper";
import type { ContractualFormData } from "@/types/contractual";

export default function OnboardingStep4() {
  const [formData, setFormData] = useState<ContractualFormData>({
    primeiroEmprego: "",
    numeroPIS: "",
    numeroCNH: "",
    dataVencimentoCNH: "",
    comprovantePIS: null,
  });

  const handleFormUpdate = useCallback((data: ContractualFormData) => {
    setFormData(data);
  }, []);

  const handleFileUpload = useCallback((file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      comprovantePIS: file,
    }));
  }, []);

  const handleSave = () => {
    console.log("Saving contractual data:", formData);
  };

  const canProceed = true; // Temporarily enabled for dev

  return (
    <div className="min-h-screen bg-[#F8F8F8] animate-fade-in">
      <Header />
      <Breadcrumb currentPage="Admissão" />

      {/* Stepper */}
      <Stepper currentStep={4} totalSteps={10} />

      {/* Main Content */}
      <main className="w-full max-w-[1144px] mx-auto px-4 sm:px-6 md:px-8 mt-6">
        {/* Form Section */}
        <div className="mb-6">
          <ContractualForm onUpdate={handleFormUpdate} />
        </div>

        {/* Divider */}
        <div className="w-full max-w-[600px] h-[2px] bg-[#D9D9D9] mx-auto mb-10"></div>

        {/* Upload Section */}
        <div className="mb-10">
          <ContractualUpload onFileSelect={handleFileUpload} />
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
            href="/onboarding/5"
            className={`px-6 py-4 text-white text-sm rounded transition-all duration-200 text-center min-w-[107px] flex items-center justify-center hover:shadow-lg active:scale-[0.98] ${
              canProceed
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
