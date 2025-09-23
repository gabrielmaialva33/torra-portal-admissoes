"use client";

import { useEffect, useState } from "react";
import { maskCEP, maskPhone } from "@/lib/masks";
import type { AddressFormData } from "@/types/address";

interface AddressFormProps {
  onUpdate: (data: AddressFormData) => void;
  className?: string;
}

export function AddressForm({ onUpdate, className = "" }: AddressFormProps) {
  const [formData, setFormData] = useState<AddressFormData>({
    cep: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    complemento: "",
    municipio: "",
    telefone: "",
    comprovante: null,
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

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (rawValue.length <= 8) {
      setFormData((prev) => ({
        ...prev,
        cep: rawValue,
      }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (rawValue.length <= 11) {
      setFormData((prev) => ({
        ...prev,
        telefone: rawValue,
      }));
    }
  };

  return (
    <div className={className}>
      {/* Form Fields - Line 1 */}
      <div className="flex gap-10 mb-6">
        <div className="flex-1">
          <label htmlFor="cep" className="block text-[#5F5F5F] text-base mb-2">
            CEP*
          </label>
          <input
            id="cep"
            type="text"
            name="cep"
            value={maskCEP(formData.cep)}
            onChange={handleCEPChange}
            placeholder="00000-000"
            className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
            required
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="endereco"
            className="block text-[#5F5F5F] text-base mb-2"
          >
            Endereço*
          </label>
          <input
            id="endereco"
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleInputChange}
            placeholder="Digite o endereço"
            className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
            required
          />
        </div>
      </div>

      {/* Form Fields - Line 2 */}
      <div className="flex gap-10 mb-6">
        <div className="flex-1">
          <label
            htmlFor="numero"
            className="block text-[#5F5F5F] text-base mb-2"
          >
            Número*
          </label>
          <input
            id="numero"
            type="text"
            name="numero"
            value={formData.numero}
            onChange={handleInputChange}
            placeholder="Digite o número"
            className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
            required
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="bairro"
            className="block text-[#5F5F5F] text-base mb-2"
          >
            Bairro*
          </label>
          <input
            id="bairro"
            type="text"
            name="bairro"
            value={formData.bairro}
            onChange={handleInputChange}
            placeholder="Digite o bairro"
            className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
            required
          />
        </div>
      </div>

      {/* Form Fields - Line 3 */}
      <div className="flex gap-10 mb-6">
        <div className="flex-1">
          <label
            htmlFor="cidade"
            className="block text-[#5F5F5F] text-base mb-2"
          >
            Cidade*
          </label>
          <input
            id="cidade"
            type="text"
            name="cidade"
            value={formData.cidade}
            onChange={handleInputChange}
            placeholder="Digite a cidade"
            className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
            required
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="complemento"
            className="block text-[#5F5F5F] text-base mb-2"
          >
            Complemento
          </label>
          <input
            id="complemento"
            type="text"
            name="complemento"
            value={formData.complemento}
            onChange={handleInputChange}
            placeholder="Digite o complemento"
            className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
          />
        </div>
      </div>

      {/* Form Fields - Line 4 */}
      <div className="flex gap-10">
        <div className="flex-1">
          <label
            htmlFor="municipio"
            className="block text-[#5F5F5F] text-base mb-2"
          >
            Município
          </label>
          <input
            id="municipio"
            type="text"
            name="municipio"
            value={formData.municipio}
            onChange={handleInputChange}
            placeholder="Digite o município"
            className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="telefone"
            className="block text-[#5F5F5F] text-base mb-2"
          >
            Telefone + DDD
          </label>
          <input
            id="telefone"
            type="text"
            name="telefone"
            value={maskPhone(formData.telefone)}
            onChange={handlePhoneChange}
            placeholder="(00) 00000-0000"
            className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
          />
        </div>
      </div>
    </div>
  );
}
