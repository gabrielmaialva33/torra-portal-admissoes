"use client";

import { useEffect, useState } from "react";
import type { ApprenticeFormData } from "@/types/apprentice";
import {
  isApprenticeOptions,
  modoContratacaoOptions,
} from "@/types/apprentice";

interface ApprenticeFormProps {
  onUpdate: (data: ApprenticeFormData) => void;
  className?: string;
}

const formatCNPJ = (value: string) => {
  const cleanValue = value.replace(/\D/g, "");
  return cleanValue
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .substring(0, 18);
};

export function ApprenticeForm({
  onUpdate,
  className = "",
}: ApprenticeFormProps) {
  const [formData, setFormData] = useState<ApprenticeFormData>({
    isApprentice: "",
    modoContratacao: "",
    cnpjEntidadeQualificadora: "",
    cnpjExercicioAtividades: "",
    localPessoaJuridica: "",
  });

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (
      name === "cnpjEntidadeQualificadora" ||
      name === "cnpjExercicioAtividades"
    ) {
      setFormData((prev) => ({
        ...prev,
        [name]: formatCNPJ(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const showApprenticeFields = formData.isApprentice === "sim";

  return (
    <div className={className}>
      {/* Pergunta Principal */}
      <div className="mb-6">
        <div className="w-[552px]">
          <label
            htmlFor="isApprentice"
            className="block text-[#5F5F5F] text-base mb-2"
          >
            Você é um jovem Aprendiz?*
          </label>
          <div className="relative">
            <select
              id="isApprentice"
              name="isApprentice"
              value={formData.isApprentice}
              onChange={handleInputChange}
              className="w-full h-12 px-4 pr-10 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange appearance-none transition-all duration-200 hover:border-[#999999] cursor-pointer"
              required
            >
              <option value="">Selecione</option>
              {isApprenticeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
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
      </div>

      {/* Campos de Aprendiz - só aparece se isApprentice = "sim" */}
      {showApprenticeFields && (
        <>
          {/* Linha 1: Modo de contratação + CNPJ da entidade qualificadora */}
          <div className="flex gap-10 mb-6">
            <div className="flex-1">
              <label
                htmlFor="modoContratacao"
                className="block text-[#5F5F5F] text-base mb-2"
              >
                Modo de contratação*
              </label>
              <div className="relative">
                <select
                  id="modoContratacao"
                  name="modoContratacao"
                  value={formData.modoContratacao}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 pr-10 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange appearance-none transition-all duration-200 hover:border-[#999999] cursor-pointer"
                  required
                >
                  <option value="">Selecione o modo</option>
                  {modoContratacaoOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
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
            <div className="flex-1">
              <label
                htmlFor="cnpjEntidadeQualificadora"
                className="block text-[#5F5F5F] text-base mb-2"
              >
                CNPJ da entidade qualificadora*
              </label>
              <input
                id="cnpjEntidadeQualificadora"
                type="text"
                name="cnpjEntidadeQualificadora"
                value={formData.cnpjEntidadeQualificadora}
                onChange={handleInputChange}
                placeholder="00.000.000/0000-00"
                className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
                required
              />
            </div>
          </div>

          {/* Linha 2: CNPJ de exercício + Local da pessoa jurídica */}
          <div className="flex gap-10 mb-6">
            <div className="flex-1">
              <label
                htmlFor="cnpjExercicioAtividades"
                className="block text-[#5F5F5F] text-base mb-2"
              >
                CNPJ de exercício atividades práticas*
              </label>
              <input
                id="cnpjExercicioAtividades"
                type="text"
                name="cnpjExercicioAtividades"
                value={formData.cnpjExercicioAtividades}
                onChange={handleInputChange}
                placeholder="00.000.000/0000-00"
                className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
                required
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="localPessoaJuridica"
                className="block text-[#5F5F5F] text-base mb-2"
              >
                Local da pessoa Jurídica - Instituição de ensino
              </label>
              <input
                id="localPessoaJuridica"
                type="text"
                name="localPessoaJuridica"
                value={formData.localPessoaJuridica}
                onChange={handleInputChange}
                placeholder="Digite o local da instituição"
                className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
