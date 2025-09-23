"use client";

import { useEffect, useState } from "react";
import { maskCPF } from "@/lib/masks";
import {
  type Dependent,
  type DependentFormData,
  grausParentesco,
} from "@/types/dependent";

interface DependentFormProps {
  dependent?: Dependent;
  onUpdate: (data: DependentFormData) => void;
  onRemove?: () => void;
  className?: string;
}

export function DependentForm({
  dependent,
  onUpdate,
  onRemove,
  className = "",
}: DependentFormProps) {
  const [formData, setFormData] = useState<DependentFormData>(() => {
    if (dependent) {
      return {
        nomeCompleto: dependent.nomeCompleto,
        grauParentesco: dependent.grauParentesco,
        dataNascimento: dependent.dataNascimento,
        cpf: dependent.cpf,
        documentos: dependent.documentos,
      };
    }
    return {
      nomeCompleto: "",
      grauParentesco: "",
      dataNascimento: "",
      cpf: "",
      documentos: {
        cpfFile: null,
        certidaoNascimento: null,
        documentoGuarda: null,
      },
    };
  });

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (rawValue.length <= 11) {
      setFormData((prev) => ({
        ...prev,
        cpf: rawValue,
      }));
    }
  };

  return (
    <div className={className}>
      {/* Header with remove button */}
      {onRemove && (
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-[#5F5F5F]">
            Dependente {dependent ? `#${dependent.id.slice(-4)}` : "Novo"}
          </h3>
          <button
            type="button"
            onClick={onRemove}
            className="text-red-500 hover:text-red-700 p-1"
          >
            ✕ Remover
          </button>
        </div>
      )}

      {/* Form Fields - Line 1 */}
      <div className="flex gap-10 mb-6">
        <div className="flex-1">
          <label
            htmlFor={`nomeCompleto-${dependent?.id || "new"}`}
            className="block text-[#5F5F5F] text-base mb-2"
          >
            Nome Completo do dependente*
          </label>
          <input
            id={`nomeCompleto-${dependent?.id || "new"}`}
            type="text"
            name="nomeCompleto"
            value={formData.nomeCompleto}
            onChange={handleInputChange}
            placeholder="Digite o nome completo do dependente"
            className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
            required
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor={`grauParentesco-${dependent?.id || "new"}`}
            className="block text-[#5F5F5F] text-base mb-2"
          >
            Grau de parentesco do dependente*
          </label>
          <div className="relative">
            <select
              id={`grauParentesco-${dependent?.id || "new"}`}
              name="grauParentesco"
              value={formData.grauParentesco}
              onChange={handleInputChange}
              className="w-full h-12 px-4 pr-10 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange appearance-none transition-all duration-200 hover:border-[#999999] cursor-pointer"
              required
            >
              <option value="">Selecione o grau de parentesco</option>
              {grausParentesco.map((grau) => (
                <option key={grau.value} value={grau.value}>
                  {grau.label}
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

      {/* Form Fields - Line 2 */}
      <div className="flex gap-10 mb-6">
        <div className="flex-1">
          <label
            htmlFor={`dataNascimento-${dependent?.id || "new"}`}
            className="block text-[#5F5F5F] text-base mb-2"
          >
            Data de Nascimento do dependente*
          </label>
          <input
            id={`dataNascimento-${dependent?.id || "new"}`}
            type="date"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleInputChange}
            className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
            required
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor={`cpf-${dependent?.id || "new"}`}
            className="block text-[#5F5F5F] text-base mb-2"
          >
            CPF do dependente*
          </label>
          <input
            id={`cpf-${dependent?.id || "new"}`}
            type="text"
            name="cpf"
            value={maskCPF(formData.cpf)}
            onChange={handleCPFChange}
            placeholder="000.000.000-00"
            className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
            required
          />
        </div>
      </div>
    </div>
  );
}
