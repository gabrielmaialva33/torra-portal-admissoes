"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Header } from "@/components/ui/header";
import { PCDForm } from "@/components/ui/pcd-form";
import { PCDUpload } from "@/components/ui/pcd-upload";
import { Stepper } from "@/components/ui/stepper";
import type { PCDFormData } from "@/types/pcd";

export default function OnboardingStep5() {
  const [formData, setFormData] = useState<PCDFormData>({
    isPCD: "",
    deficienciaVisual: "",
    deficienciaAuditiva: "",
    deficienciaMental: "",
    deficienciaIntelectual: "",
    deficienciaFisica: "",
    observacao: "",
    laudoMedico: null,
  });

  const handleFormUpdate = useCallback((data: PCDFormData) => {
    setFormData(data);
  }, []);

  const handleFileUpload = useCallback((file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      laudoMedico: file,
    }));
  }, []);

  const handleSave = () => {
    console.log("Saving PCD data:", formData);
  };

  // Lógica de validação condicional
  const canProceed = () => {
    // Se não respondeu a pergunta principal, não pode prosseguir
    if (!formData.isPCD) return false;

    // Se respondeu "não", pode prosseguir imediatamente
    if (formData.isPCD === "nao") return true;

    // Se respondeu "sim", precisa:
    // 1. Pelo menos um tipo de deficiência selecionado (e diferente de vazio)
    // 2. Upload do laudo médico
    if (formData.isPCD === "sim") {
      const hasDeficiencia =
        (formData.deficienciaVisual && formData.deficienciaVisual !== "") ||
        (formData.deficienciaAuditiva && formData.deficienciaAuditiva !== "") ||
        (formData.deficienciaMental && formData.deficienciaMental !== "") ||
        (formData.deficienciaIntelectual &&
          formData.deficienciaIntelectual !== "") ||
        (formData.deficienciaFisica && formData.deficienciaFisica !== "");

      return hasDeficiencia && formData.laudoMedico !== null;
    }

    return false;
  };

  const showUploadSection = formData.isPCD === "sim";

  return (
    <div className="min-h-screen bg-[#F8F8F8] animate-fade-in">
      <Header />
      <Breadcrumb currentPage="Admissão" />

      {/* Stepper */}
      <Stepper currentStep={5} totalSteps={10} />

      {/* Main Content */}
      <main className="w-full max-w-[1144px] mx-auto px-8 mt-6">
        {/* Form Section */}
        <div className="mb-6">
          <PCDForm onUpdate={handleFormUpdate} />
        </div>

        {/* Upload Section - só aparece se isPCD = "sim" */}
        {showUploadSection && (
          <>
            {/* Divider */}
            <div className="w-[600px] h-[2px] bg-[#D9D9D9] mx-auto mb-10"></div>

            <div className="mb-10">
              <PCDUpload onFileSelect={handleFileUpload} />
            </div>
          </>
        )}

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
            href="/onboarding/6"
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
