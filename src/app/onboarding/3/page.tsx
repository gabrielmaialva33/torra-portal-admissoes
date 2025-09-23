"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { AddressForm } from "@/components/ui/address-form";
import { AddressUpload } from "@/components/ui/address-upload";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Header } from "@/components/ui/header";
import { Stepper } from "@/components/ui/stepper";
import type { AddressFormData } from "@/types/address";

export default function OnboardingStep3() {
  const [formData, setFormData] = useState<AddressFormData>({
    cep: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    complemento: "",
    municipio: "",
    telefone: "",
    comprovante: null,
  });

  const handleFormUpdate = useCallback((data: AddressFormData) => {
    setFormData(data);
  }, []);

  const handleFileUpload = useCallback((file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      comprovante: file,
    }));
  }, []);

  const handleSave = () => {
    console.log("Saving address data:", formData);
  };

  const validateForm = () => {
    return !!(
      formData.cep.trim() &&
      formData.endereco.trim() &&
      formData.numero.trim() &&
      formData.bairro.trim() &&
      formData.cidade.trim() &&
      formData.comprovante
    );
  };

  const canProceed = true; // Temporarily enabled for dev

  return (
    <div className="min-h-screen bg-[#F8F8F8] animate-fade-in">
      <Header />
      <Breadcrumb currentPage="Admissão" />

      {/* Stepper */}
      <Stepper currentStep={3} totalSteps={10} />

      {/* Main Content */}
      <main className="w-full max-w-[1144px] mx-auto px-8 mt-6">
        {/* Form Section */}
        <div className="mb-6">
          <AddressForm onUpdate={handleFormUpdate} />
        </div>

        {/* Divider */}
        <div className="w-[600px] h-[2px] bg-[#D9D9D9] mx-auto mb-10"></div>

        {/* Upload Section */}
        <div className="mb-10">
          <AddressUpload onFileSelect={handleFileUpload} />
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
            href="/onboarding/4"
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
