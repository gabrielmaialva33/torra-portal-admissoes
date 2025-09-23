"use client";

import { useEffect, useState } from "react";
import { maskPIS } from "@/lib/masks";
import type { ContractualFormData } from "@/types/contractual";
import { primeiroEmpregoOptions } from "@/types/contractual";

interface ContractualFormProps {
  onUpdate: (data: ContractualFormData) => void;
  className?: string;
}

export function ContractualForm({
  onUpdate,
  className = "",
}: ContractualFormProps) {
  const [formData, setFormData] = useState<ContractualFormData>({
    primeiroEmprego: "",
    numeroPIS: "",
    numeroCNH: "",
    dataVencimentoCNH: "",
    comprovantePIS: null,
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

  const handlePISChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (rawValue.length <= 11) {
      setFormData((prev) => ({
        ...prev,
        numeroPIS: rawValue,
      }));
    }
  };

  return (
    <div className={className}>
      {/* Form Fields - Line 1 */}
      <div className="flex gap-10 mb-6">
        <div className="flex-1">
          <label
            htmlFor="primeiroEmprego"
            className="block text-[#5F5F5F] text-base mb-2"
          >
            É a 1º emprego de Carteira Assinada?*
          </label>
          <div className="relative">
            <select
              id="primeiroEmprego"
              name="primeiroEmprego"
              value={formData.primeiroEmprego}
              onChange={handleInputChange}
              className="w-full h-12 px-4 pr-10 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange appearance-none transition-all duration-200 hover:border-[#999999] cursor-pointer"
              required
            >
              <option value="">Selecione</option>
              {primeiroEmpregoOptions.map((option) => (
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
            htmlFor="numeroPIS"
            className="block text-[#5F5F5F] text-base mb-2"
          >
            Número do PIS/PASEP*
          </label>
          <input
            id="numeroPIS"
            type="text"
            name="numeroPIS"
            value={maskPIS(formData.numeroPIS)}
            onChange={handlePISChange}
            placeholder="000.00000.00-0"
            className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
            required
          />
        </div>
      </div>

      {/* Form Fields - Line 2 */}
      <div className="flex gap-10">
        <div className="flex-1">
          <label
            htmlFor="numeroCNH"
            className="block text-[#5F5F5F] text-base mb-2"
          >
            Número da sua CNH
          </label>
          <input
            id="numeroCNH"
            type="text"
            name="numeroCNH"
            value={formData.numeroCNH}
            onChange={handleInputChange}
            placeholder="Digite o número da CNH"
            className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="dataVencimentoCNH"
            className="block text-[#5F5F5F] text-base mb-2"
          >
            Data de vencimento da CNH
          </label>
          <input
            id="dataVencimentoCNH"
            type="date"
            name="dataVencimentoCNH"
            value={formData.dataVencimentoCNH}
            onChange={handleInputChange}
            className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
          />
        </div>
      </div>
    </div>
  );
}
