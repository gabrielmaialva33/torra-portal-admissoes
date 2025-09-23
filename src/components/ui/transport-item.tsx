"use client";

import { useEffect, useState } from "react";
import type { TransportItemFormData } from "@/types/transport";
import {
  meioTransporteOptions,
  quantidadePassagemOptions,
} from "@/types/transport";

interface TransportItemProps {
  transport?: TransportItemFormData & { id: string };
  onUpdate: (data: TransportItemFormData) => void;
  onRemove?: () => void;
  className?: string;
}

export function TransportItem({
  transport,
  onUpdate,
  onRemove,
  className = "",
}: TransportItemProps) {
  const [formData, setFormData] = useState<TransportItemFormData>(() => {
    if (transport) {
      return {
        meioTransporte: transport.meioTransporte,
        quantidadePassagem: transport.quantidadePassagem,
        operadora: transport.operadora,
        valorPassagem: transport.valorPassagem,
      };
    }
    return {
      meioTransporte: "",
      quantidadePassagem: "",
      operadora: "",
      valorPassagem: "",
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

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d,]/g, "");
    setFormData((prev) => ({
      ...prev,
      valorPassagem: rawValue,
    }));
  };

  return (
    <div className={className}>
      {/* Header with remove button */}
      {onRemove && (
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-[#5F5F5F]">
            Meio de Transporte{" "}
            {transport ? `#${transport.id.slice(-4)}` : "Novo"}
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
            htmlFor={`meioTransporte-${transport?.id || "new"}`}
            className="block text-[#5F5F5F] text-base mb-2"
          >
            Meio de transporte utilizado
          </label>
          <div className="relative">
            <select
              id={`meioTransporte-${transport?.id || "new"}`}
              name="meioTransporte"
              value={formData.meioTransporte}
              onChange={handleInputChange}
              className="w-full h-12 px-4 pr-10 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange appearance-none transition-all duration-200 hover:border-[#999999] cursor-pointer"
            >
              <option value="">Selecione o meio de transporte</option>
              {meioTransporteOptions.map((option) => (
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
            htmlFor={`quantidadePassagem-${transport?.id || "new"}`}
            className="block text-[#5F5F5F] text-base mb-2"
          >
            Quantidade de passagem por dia
          </label>
          <div className="relative">
            <select
              id={`quantidadePassagem-${transport?.id || "new"}`}
              name="quantidadePassagem"
              value={formData.quantidadePassagem}
              onChange={handleInputChange}
              className="w-full h-12 px-4 pr-10 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange appearance-none transition-all duration-200 hover:border-[#999999] cursor-pointer"
            >
              <option value="">Selecione a quantidade</option>
              {quantidadePassagemOptions.map((option) => (
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

      {/* Form Fields - Line 2 */}
      <div className="flex gap-10">
        <div className="flex-1">
          <label
            htmlFor={`operadora-${transport?.id || "new"}`}
            className="block text-[#5F5F5F] text-base mb-2"
          >
            Operadora de transporte
          </label>
          <input
            id={`operadora-${transport?.id || "new"}`}
            type="text"
            name="operadora"
            value={formData.operadora}
            onChange={handleInputChange}
            placeholder="Digite a operadora"
            className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor={`valorPassagem-${transport?.id || "new"}`}
            className="block text-[#5F5F5F] text-base mb-2"
          >
            Valor de cada passagem
          </label>
          <input
            id={`valorPassagem-${transport?.id || "new"}`}
            type="text"
            name="valorPassagem"
            value={formData.valorPassagem}
            onChange={handleValueChange}
            placeholder="R$ 0,00"
            className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
          />
        </div>
      </div>
    </div>
  );
}
