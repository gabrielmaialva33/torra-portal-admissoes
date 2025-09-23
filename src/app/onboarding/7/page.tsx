"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ForeignerForm } from "@/components/ui/foreigner-form";
import { ForeignerUpload } from "@/components/ui/foreigner-upload";
import { Header } from "@/components/ui/header";
import { Stepper } from "@/components/ui/stepper";
import type { ForeignerFormData } from "@/types/foreigner";

export default function OnboardingStep7() {
  const [formData, setFormData] = useState<ForeignerFormData>({
    isForeigner: "",
    dataChegada: "",
    numeroRNE: "",
    nacionalidade: "",
    dataExpedicao: "",
    documentoRNE: null,
  });

  const handleFormUpdate = useCallback((data: ForeignerFormData) => {
    setFormData(data);
  }, []);

  const handleFileSelect = useCallback((file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      documentoRNE: file,
    }));
  }, []);

  const handleSave = () => {
    console.log("Saving foreigner data:", formData);
  };

  const canProceed = () => {
    return true; // Temporarily enabled for dev
  };

  const showUpload = formData.isForeigner === "sim";

  return (
    <div className="min-h-screen bg-[#F8F8F8] animate-fade-in">
      <Header />
      <Breadcrumb currentPage="Admissão" />

      {/* Stepper */}
      <Stepper currentStep={7} totalSteps={10} />

      {/* Main Content */}
      <main className="w-full max-w-[1144px] mx-auto px-8 mt-6">
        {/* Form Section */}
        <div className="mb-6">
          <ForeignerForm onUpdate={handleFormUpdate} />

          {showUpload && (
            <>
              <div className="w-full h-px bg-[#EEEEEE] my-8" />
              <ForeignerUpload onFileSelect={handleFileSelect} />
            </>
          )}
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
            href="/onboarding/8"
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
