"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Header } from "@/components/ui/header";
import { Stepper } from "@/components/ui/stepper";
import { TransportForm } from "@/components/ui/transport-form";
import type { TransportFormData } from "@/types/transport";

export default function OnboardingStep6() {
  const [formData, setFormData] = useState<TransportFormData>({
    useTransport: "",
    transports: [],
  });

  const handleFormUpdate = useCallback((data: TransportFormData) => {
    setFormData(data);
  }, []);

  const handleSave = () => {
    console.log("Saving transport data:", formData);
  };

  // Lógica de validação condicional
  const canProceed = () => {
    // Se não respondeu a pergunta principal, não pode prosseguir
    if (!formData.useTransport) return false;

    // Se respondeu "não", pode prosseguir imediatamente
    if (formData.useTransport === "nao") return true;

    // Se respondeu "sim", precisa ter pelo menos um transporte válido
    if (formData.useTransport === "sim") {
      return (
        formData.transports.length > 0 &&
        formData.transports.every((transport) => {
          return !!(
            transport.meioTransporte.trim() &&
            transport.quantidadePassagem.trim() &&
            transport.operadora.trim() &&
            transport.valorPassagem.trim()
          );
        })
      );
    }

    return false;
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] animate-fade-in">
      <Header />
      <Breadcrumb currentPage="Admissão" />

      {/* Stepper */}
      <Stepper currentStep={6} totalSteps={10} />

      {/* Main Content */}
      <main className="w-full max-w-[1144px] mx-auto px-8 mt-6">
        {/* Form Section */}
        <div className="mb-6">
          <TransportForm onUpdate={handleFormUpdate} />
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
            href="/onboarding/7"
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
