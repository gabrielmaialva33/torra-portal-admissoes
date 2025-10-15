"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AddressForm } from "@/components/ui/address-form";
import { AddressUpload } from "@/components/ui/address-upload";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/stores/onboarding-store";
import type { AddressFormData } from "@/types/address";

export function AddressStepForm() {
  const router = useRouter();
  const { formData, updateFormData, markStepComplete, setCurrentStep } =
    useOnboardingStore();

  const [addressData, setAddressData] = useState<AddressFormData>({
    cep: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    complemento: "",
    municipio: "",
    telefone: "",
    comprovante: null,
    ...formData.address,
  });

  const handleNext = () => {
    updateFormData("address", addressData);
    markStepComplete(3);
    setCurrentStep(4);
    router.push("/onboarding/4");
  };

  const handleSave = () => {
    updateFormData("address", addressData);
    alert("Dados salvos com sucesso!");
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-8">
          <h2 className="text-xl font-medium text-[#37375B] mb-6">
            Endereço Residencial
          </h2>

          {/* Address Form */}
          <AddressForm onUpdate={setAddressData} className="mb-8" />

          {/* Address Proof Upload */}
          <div className="border-t pt-6">
            <p className="text-gray-600 text-center mb-6">
              Agora, faça o envio do comprovante de residência.
            </p>
            <AddressUpload
              onFileSelect={(file) => {
                setAddressData({ ...addressData, comprovante: file });
              }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/onboarding/2")}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Voltar
            </Button>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleSave}
                className="bg-torra-dark-blue text-white hover:bg-torra-dark-blue/90"
              >
                Salvar
              </Button>
              <Button
                type="button"
                onClick={handleNext}
                className="bg-torra-orange text-white hover:bg-torra-orange/90"
              >
                Próximo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
