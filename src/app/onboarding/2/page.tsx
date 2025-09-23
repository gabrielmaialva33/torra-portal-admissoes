"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { DependentForm } from "@/components/ui/dependent-form";
import { DependentUpload } from "@/components/ui/dependent-upload";
import { Header } from "@/components/ui/header";
import { Stepper } from "@/components/ui/stepper";
import { useDependents } from "@/hooks/useDependents";
import type { DependentFormData } from "@/types/dependent";

export default function OnboardingStep2() {
  const [hasDependents, setHasDependents] = useState<"" | "sim" | "nao">("");
  const [currentDependentData, setCurrentDependentData] =
    useState<DependentFormData | null>(null);

  const {
    dependents,
    addDependent,
    updateDependent,
    removeDependent,
    clearDependents,
    getEmptyDependent,
  } = useDependents();

  const handleDependentsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "" | "sim" | "nao";
    setHasDependents(value);

    if (value === "nao") {
      clearDependents();
      setCurrentDependentData(null);
    } else if (value === "sim" && dependents.length === 0) {
      // Inicializar com primeiro dependente vazio
      setCurrentDependentData(getEmptyDependent());
    }
  };

  const handleAddNewDependent = () => {
    if (currentDependentData) {
      addDependent(currentDependentData);
    }
    setCurrentDependentData(getEmptyDependent());
  };

  const handleSaveCurrentDependent = () => {
    if (currentDependentData) {
      addDependent(currentDependentData);
      setCurrentDependentData(null);
    }
  };

  const handleRemoveDependent = (id: string) => {
    removeDependent(id);
  };

  const handleCurrentDependentUpdate = useCallback(
    (data: DependentFormData) => {
      setCurrentDependentData(data);
    },
    [],
  );

  const handleDocumentUpload = useCallback(
    (documentType: "cpfFile" | "certidaoNascimento" | "documentoGuarda") =>
      (file: File | null) => {
        if (currentDependentData) {
          setCurrentDependentData((prev) =>
            prev
              ? {
                  ...prev,
                  documentos: {
                    ...prev.documentos,
                    [documentType]: file,
                  },
                }
              : null,
          );
        }
      },
    [currentDependentData],
  );

  const canProceed = () => {
    if (hasDependents === "nao") return true;
    if (hasDependents === "sim") {
      // Precisa ter pelo menos um dependente salvo OU o atual preenchido corretamente
      const hasValidCurrent =
        currentDependentData?.nomeCompleto.trim() &&
        currentDependentData?.grauParentesco &&
        currentDependentData?.dataNascimento &&
        currentDependentData?.cpf.trim() &&
        currentDependentData?.documentos.cpfFile;

      return dependents.length > 0 || hasValidCurrent;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] animate-fade-in">
      <Header />
      <Breadcrumb currentPage="Admissão" />

      {/* Stepper */}
      <Stepper currentStep={2} totalSteps={10} />

      {/* Main Content */}
      <main className="w-full max-w-[1144px] mx-auto px-8 mt-6">
        {/* Form Section */}
        <div className="mb-6">
          {/* Question: Possui dependentes? */}
          <div className="flex flex-col gap-2 w-[552px] mb-6">
            <label
              htmlFor="hasDependents"
              className="block text-[#5F5F5F] text-base"
            >
              Você possui dependentes?*
            </label>
            <div className="relative">
              <select
                id="hasDependents"
                value={hasDependents}
                onChange={handleDependentsChange}
                className="w-full h-12 px-4 pr-10 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange appearance-none transition-all duration-200 hover:border-[#999999] cursor-pointer"
                required
              >
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
              <svg
                role="img"
                aria-label="Dropdown arrow"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-3 text-[#AAAAAA] pointer-events-none"
                fill="none"
                viewBox="0 0 12 7"
              >
                <path
                  d="M1 1L6 6L11 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Show dependent form and uploads only if "sim" is selected */}
          {hasDependents === "sim" && (
            <>
              {/* Existing Dependents */}
              {dependents.map((dependent) => (
                <div key={dependent.id} className="mb-6">
                  <DependentForm
                    dependent={dependent}
                    onUpdate={(data) => updateDependent(dependent.id, data)}
                    onRemove={() => handleRemoveDependent(dependent.id)}
                  />
                </div>
              ))}

              {/* Current Dependent Form */}
              {currentDependentData && (
                <div className="mb-6">
                  <DependentForm onUpdate={handleCurrentDependentUpdate} />
                </div>
              )}

              {/* Upload Section - only show if we have current dependent data */}
              {currentDependentData && (
                <>
                  {/* Divider */}
                  <div className="w-[600px] h-[2px] bg-[#D9D9D9] mx-auto mb-10"></div>

                  <DependentUpload
                    onFileSelect={handleDocumentUpload}
                    className="mb-10"
                  />
                </>
              )}
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end mb-10">
          {hasDependents === "sim" && currentDependentData && (
            <>
              <button
                type="button"
                onClick={handleAddNewDependent}
                className="px-6 py-4 bg-[#37375B] text-white text-sm rounded hover:bg-[#2a2a4a] transition-all duration-200 min-w-[200px] hover:shadow-lg active:scale-[0.98]"
              >
                Adicionar novo dependente
              </button>
              <button
                type="button"
                onClick={handleSaveCurrentDependent}
                className="px-6 py-4 bg-[#37375B] text-white text-sm rounded hover:bg-[#2a2a4a] transition-all duration-200 min-w-[107px] hover:shadow-lg active:scale-[0.98]"
              >
                Salvar
              </button>
            </>
          )}

          <Link
            href="/onboarding/3"
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
