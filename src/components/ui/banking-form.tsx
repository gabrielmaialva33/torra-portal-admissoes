"use client";

import { useEffect, useState } from "react";
import type { BankingFormData } from "@/types/banking";
import { isItauCustomerOptions, tipoContaOptions } from "@/types/banking";

interface BankingFormProps {
  onUpdate: (data: BankingFormData) => void;
  className?: string;
}

export function BankingForm({ onUpdate, className = "" }: BankingFormProps) {
  const [formData, setFormData] = useState<BankingFormData>({
    isItauCustomer: "",
    agenciaBancaria: "",
    tipoConta: "",
    numeroConta: "",
    digito: "",
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

  const showBankingFields = formData.isItauCustomer === "sim";

  return (
    <div className={className}>
      {/* Pergunta Principal */}
      <div className="mb-6">
        <div className="w-[552px]">
          <label
            htmlFor="isItauCustomer"
            className="block text-[#5F5F5F] text-base mb-2"
          >
            Você é correntista Itaú?*
          </label>
          <div className="relative">
            <select
              id="isItauCustomer"
              name="isItauCustomer"
              value={formData.isItauCustomer}
              onChange={handleInputChange}
              className="w-full h-12 px-4 pr-10 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange appearance-none transition-all duration-200 hover:border-[#999999] cursor-pointer"
              required
            >
              <option value="">Selecione</option>
              {isItauCustomerOptions.map((option) => (
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

      {/* Campos Bancários - só aparece se isItauCustomer = "sim" */}
      {showBankingFields && (
        <>
          {/* Linha 1: Agencia bancária + tipo da conta */}
          <div className="flex gap-10 mb-6">
            <div className="flex-1">
              <label
                htmlFor="agenciaBancaria"
                className="block text-[#5F5F5F] text-base mb-2"
              >
                Agencia bancaria*
              </label>
              <input
                id="agenciaBancaria"
                type="text"
                name="agenciaBancaria"
                value={formData.agenciaBancaria}
                onChange={handleInputChange}
                placeholder="Digite a agência"
                className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
                required
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="tipoConta"
                className="block text-[#5F5F5F] text-base mb-2"
              >
                tipo da conta
              </label>
              <div className="relative">
                <select
                  id="tipoConta"
                  name="tipoConta"
                  value={formData.tipoConta}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 pr-10 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange appearance-none transition-all duration-200 hover:border-[#999999] cursor-pointer"
                >
                  <option value="">Selecione o tipo</option>
                  {tipoContaOptions.map((option) => (
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

          {/* Linha 2: Número da conta + Dígito */}
          <div className="flex gap-10 mb-6">
            <div className="flex-1">
              <label
                htmlFor="numeroConta"
                className="block text-[#5F5F5F] text-base mb-2"
              >
                Número da conta*
              </label>
              <input
                id="numeroConta"
                type="text"
                name="numeroConta"
                value={formData.numeroConta}
                onChange={handleInputChange}
                placeholder="Digite o número da conta"
                className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
                required
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="digito"
                className="block text-[#5F5F5F] text-base mb-2"
              >
                Dígito*
              </label>
              <input
                id="digito"
                type="text"
                name="digito"
                value={formData.digito}
                onChange={handleInputChange}
                placeholder="Digite o dígito"
                maxLength={2}
                className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
                required
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
