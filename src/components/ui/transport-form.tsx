"use client";

import { useCallback, useEffect, useState } from "react";
import { TransportItem } from "@/components/ui/transport-item";
import type {
  TransportFormData,
  TransportItemFormData,
} from "@/types/transport";
import { useTransportOptions } from "@/types/transport";

interface TransportFormProps {
  onUpdate: (data: TransportFormData) => void;
  className?: string;
}

export function TransportForm({
  onUpdate,
  className = "",
}: TransportFormProps) {
  const [formData, setFormData] = useState<TransportFormData>({
    useTransport: "",
    transports: [],
  });

  const [currentTransportData, setCurrentTransportData] =
    useState<TransportItemFormData | null>(null);

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleUseTransportChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = e.target.value as "" | "sim" | "nao";
    setFormData((prev) => ({
      ...prev,
      useTransport: value,
      transports: value === "nao" ? [] : prev.transports,
    }));

    if (value === "nao") {
      setCurrentTransportData(null);
    } else if (value === "sim" && formData.transports.length === 0) {
      setCurrentTransportData({
        meioTransporte: "",
        quantidadePassagem: "",
        operadora: "",
        valorPassagem: "",
      });
    }
  };

  const handleAddNewTransport = () => {
    if (currentTransportData) {
      const newTransport = {
        id: crypto.randomUUID(),
        ...currentTransportData,
      };
      setFormData((prev) => ({
        ...prev,
        transports: [...prev.transports, newTransport],
      }));
    }
    setCurrentTransportData({
      meioTransporte: "",
      quantidadePassagem: "",
      operadora: "",
      valorPassagem: "",
    });
  };

  const handleSaveCurrentTransport = () => {
    if (currentTransportData) {
      const newTransport = {
        id: crypto.randomUUID(),
        ...currentTransportData,
      };
      setFormData((prev) => ({
        ...prev,
        transports: [...prev.transports, newTransport],
      }));
      setCurrentTransportData(null);
    }
  };

  const handleRemoveTransport = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      transports: prev.transports.filter((transport) => transport.id !== id),
    }));
  };

  const handleCurrentTransportUpdate = useCallback(
    (data: TransportItemFormData) => {
      setCurrentTransportData(data);
    },
    [],
  );

  const handleTransportUpdate = useCallback(
    (id: string) => (data: TransportItemFormData) => {
      setFormData((prev) => ({
        ...prev,
        transports: prev.transports.map((transport) =>
          transport.id === id ? { ...transport, ...data } : transport,
        ),
      }));
    },
    [],
  );

  const showTransportFields = formData.useTransport === "sim";

  return (
    <div className={className}>
      {/* Pergunta Principal */}
      <div className="mb-6">
        <div className="w-[552px]">
          <label
            htmlFor="useTransport"
            className="block text-[#5F5F5F] text-base mb-2"
          >
            Você vai utilizar o vale transporte?*
          </label>
          <div className="relative">
            <select
              id="useTransport"
              name="useTransport"
              value={formData.useTransport}
              onChange={handleUseTransportChange}
              className="w-full h-12 px-4 pr-10 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange appearance-none transition-all duration-200 hover:border-[#999999] cursor-pointer"
              required
            >
              <option value="">Selecione</option>
              {useTransportOptions.map((option) => (
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

      {/* Campos de Transporte - só aparece se useTransport = "sim" */}
      {showTransportFields && (
        <>
          {/* Existing Transports */}
          {formData.transports.map((transport) => (
            <div key={transport.id} className="mb-6">
              <TransportItem
                transport={transport}
                onUpdate={handleTransportUpdate(transport.id)}
                onRemove={() => handleRemoveTransport(transport.id)}
              />
            </div>
          ))}

          {/* Current Transport Form */}
          {currentTransportData && (
            <div className="mb-6">
              <TransportItem onUpdate={handleCurrentTransportUpdate} />
            </div>
          )}

          {/* Action Buttons for Transport Management */}
          {currentTransportData && (
            <div className="flex gap-3 mb-6">
              <button
                type="button"
                onClick={handleAddNewTransport}
                className="px-6 py-4 bg-[#37375B] text-white text-sm rounded hover:bg-[#2a2a4a] transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
              >
                Adicionar meio de transporte
              </button>
              <button
                type="button"
                onClick={handleSaveCurrentTransport}
                className="px-6 py-4 bg-[#37375B] text-white text-sm rounded hover:bg-[#2a2a4a] transition-all duration-200 min-w-[107px] hover:shadow-lg active:scale-[0.98]"
              >
                Salvar
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
