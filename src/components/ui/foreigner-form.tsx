"use client";

import { useEffect, useState } from "react";
import type { ForeignerFormData } from "@/types/foreigner";
import { isForeignerOptions, nacionalidadeOptions } from "@/types/foreigner";

interface ForeignerFormProps {
  onUpdate: (data: ForeignerFormData) => void;
  className?: string;
}

export function ForeignerForm({
  onUpdate,
  className = "",
}: ForeignerFormProps) {
  const [formData, setFormData] = useState<ForeignerFormData>({
    isForeigner: "",
    dataChegada: "",
    numeroRNE: "",
    nacionalidade: "",
    dataExpedicao: "",
    documentoRNE: null,
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

  const showForeignerFields = formData.isForeigner === "sim";

  return (
    <div className={className}>
      {/* Pergunta Principal */}
      <div className="mb-6">
        <div className="w-[552px]">
          <label
            htmlFor="isForeigner"
            className="block text-[#5F5F5F] text-base mb-2"
          >
            Você é estrangeiro?*
          </label>
          <div className="relative">
            <select
              id="isForeigner"
              name="isForeigner"
              value={formData.isForeigner}
              onChange={handleInputChange}
              className="w-full h-12 px-4 pr-10 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange appearance-none transition-all duration-200 hover:border-[#999999] cursor-pointer"
              required
            >
              <option value="">Selecione</option>
              {isForeignerOptions.map((option) => (
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

      {/* Campos de Estrangeiro - só aparece se isForeigner = "sim" */}
      {showForeignerFields && (
        <>
          {/* Linha 1: Data de chegada + Número do RNE */}
          <div className="flex gap-10 mb-6">
            <div className="flex-1">
              <label
                htmlFor="dataChegada"
                className="block text-[#5F5F5F] text-base mb-2"
              >
                Data de chegada ao País
              </label>
              <div className="relative">
                <input
                  id="dataChegada"
                  type="date"
                  name="dataChegada"
                  value={formData.dataChegada}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 pr-10 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
                />
                <svg
                  role="img"
                  aria-label="Calendar icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#AAAAAA] pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <label
                htmlFor="numeroRNE"
                className="block text-[#5F5F5F] text-base mb-2"
              >
                Número do RNE*
              </label>
              <input
                id="numeroRNE"
                type="text"
                name="numeroRNE"
                value={formData.numeroRNE}
                onChange={handleInputChange}
                placeholder="Digite o número do RNE"
                className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
                required
              />
            </div>
          </div>

          {/* Linha 2: Nacionalidade + Data de expedição */}
          <div className="flex gap-10 mb-6">
            <div className="flex-1">
              <label
                htmlFor="nacionalidade"
                className="block text-[#5F5F5F] text-base mb-2"
              >
                Nacionalidade*
              </label>
              <div className="relative">
                <select
                  id="nacionalidade"
                  name="nacionalidade"
                  value={formData.nacionalidade}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 pr-10 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange appearance-none transition-all duration-200 hover:border-[#999999] cursor-pointer"
                  required
                >
                  <option value="">Selecione a nacionalidade</option>
                  {nacionalidadeOptions.map((option) => (
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
                htmlFor="dataExpedicao"
                className="block text-[#5F5F5F] text-base mb-2"
              >
                Data de expedição*
              </label>
              <div className="relative">
                <input
                  id="dataExpedicao"
                  type="date"
                  name="dataExpedicao"
                  value={formData.dataExpedicao}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 pr-10 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
                  required
                />
                <svg
                  role="img"
                  aria-label="Calendar icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#AAAAAA] pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
