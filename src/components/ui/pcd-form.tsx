"use client";

import { useEffect, useState } from "react";
import type { PCDFormData } from "@/types/pcd";
import { deficienciaOptions, isPCDOptions } from "@/types/pcd";

interface PCDFormProps {
  onUpdate: (data: PCDFormData) => void;
  className?: string;
}

export function PCDForm({ onUpdate, className = "" }: PCDFormProps) {
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

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showDeficienciaFields = formData.isPCD === "sim";

  return (
    <div className={className}>
      {/* Pergunta Principal */}
      <div className="mb-6">
        <div className="w-[552px]">
          <label
            htmlFor="isPCD"
            className="block text-[#5F5F5F] text-base mb-2"
          >
            Você é uma pessoa com deficiência?*
          </label>
          <div className="relative">
            <select
              id="isPCD"
              name="isPCD"
              value={formData.isPCD}
              onChange={handleInputChange}
              className="w-full h-12 px-4 pr-10 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange appearance-none transition-all duration-200 hover:border-[#999999] cursor-pointer"
              required
            >
              <option value="">Selecione</option>
              {isPCDOptions.map((option) => (
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

      {/* Campos de Deficiência - só aparece se isPCD = "sim" */}
      {showDeficienciaFields && (
        <>
          {/* Tipos de Deficiência - Layout 2 colunas */}
          <div className="flex gap-10 mb-6">
            <div className="flex-1">
              <label
                htmlFor="deficienciaVisual"
                className="block text-[#5F5F5F] text-base mb-2"
              >
                Deficiência visual
              </label>
              <div className="relative">
                <select
                  id="deficienciaVisual"
                  name="deficienciaVisual"
                  value={formData.deficienciaVisual}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 pr-10 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange appearance-none transition-all duration-200 hover:border-[#999999] cursor-pointer"
                >
                  <option value="">Selecione</option>
                  {deficienciaOptions.map((option) => (
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
                htmlFor="deficienciaAuditiva"
                className="block text-[#5F5F5F] text-base mb-2"
              >
                Deficiência auditiva
              </label>
              <div className="relative">
                <select
                  id="deficienciaAuditiva"
                  name="deficienciaAuditiva"
                  value={formData.deficienciaAuditiva}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 pr-10 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange appearance-none transition-all duration-200 hover:border-[#999999] cursor-pointer"
                >
                  <option value="">Selecione</option>
                  {deficienciaOptions.map((option) => (
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

          <div className="flex gap-10 mb-6">
            <div className="flex-1">
              <label
                htmlFor="deficienciaMental"
                className="block text-[#5F5F5F] text-base mb-2"
              >
                Deficiência mental
              </label>
              <div className="relative">
                <select
                  id="deficienciaMental"
                  name="deficienciaMental"
                  value={formData.deficienciaMental}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 pr-10 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange appearance-none transition-all duration-200 hover:border-[#999999] cursor-pointer"
                >
                  <option value="">Selecione</option>
                  {deficienciaOptions.map((option) => (
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
                htmlFor="deficienciaIntelectual"
                className="block text-[#5F5F5F] text-base mb-2"
              >
                Deficiência Intelectual
              </label>
              <div className="relative">
                <select
                  id="deficienciaIntelectual"
                  name="deficienciaIntelectual"
                  value={formData.deficienciaIntelectual}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 pr-10 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange appearance-none transition-all duration-200 hover:border-[#999999] cursor-pointer"
                >
                  <option value="">Selecione</option>
                  {deficienciaOptions.map((option) => (
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

          <div className="flex gap-10 mb-6">
            <div className="flex-1">
              <label
                htmlFor="deficienciaFisica"
                className="block text-[#5F5F5F] text-base mb-2"
              >
                Deficiência física
              </label>
              <div className="relative">
                <select
                  id="deficienciaFisica"
                  name="deficienciaFisica"
                  value={formData.deficienciaFisica}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 pr-10 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange appearance-none transition-all duration-200 hover:border-[#999999] cursor-pointer"
                >
                  <option value="">Selecione</option>
                  {deficienciaOptions.map((option) => (
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
                htmlFor="observacao"
                className="block text-[#5F5F5F] text-base mb-2"
              >
                Observação
              </label>
              <textarea
                id="observacao"
                name="observacao"
                value={formData.observacao}
                onChange={handleInputChange}
                placeholder="Digite observações adicionais"
                className="w-full h-12 px-4 py-2 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999] resize-none"
                rows={1}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
