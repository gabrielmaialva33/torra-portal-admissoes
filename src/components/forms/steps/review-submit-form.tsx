"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/stores/onboarding-store";

export function ReviewSubmitForm() {
  const router = useRouter();
  const { formData, markStepComplete } = useOnboardingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Send data to backend API
      console.log("Submitting onboarding data:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      markStepComplete(10);
      alert("Dados enviados com sucesso! Bem-vindo à Torra!");
      router.push("/onboarding/success");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Erro ao enviar dados. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-8">
          <h2 className="text-2xl font-medium text-[#37375B] mb-6">
            Revisão e Envio
          </h2>

          <div className="space-y-6">
            {/* Personal Data Summary */}
            {formData.personalData && (
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-[#37375B] mb-3">
                  Dados Pessoais
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Nome:</span>{" "}
                    {formData.personalData.fullName}
                  </div>
                  <div>
                    <span className="text-gray-600">CPF:</span>{" "}
                    {formData.personalData.cpf}
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>{" "}
                    {formData.personalData.email}
                  </div>
                  <div>
                    <span className="text-gray-600">Telefone:</span>{" "}
                    {formData.personalData.phone}
                  </div>
                </div>
              </div>
            )}

            {/* Dependents Summary */}
            {formData.dependents && formData.dependents.length > 0 && (
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-[#37375B] mb-3">
                  Dependentes
                </h3>
                <p className="text-sm text-gray-600">
                  {formData.dependents.length} dependente(s) cadastrado(s)
                </p>
              </div>
            )}

            {/* Address Summary */}
            {formData.address && Object.keys(formData.address).length > 0 && (
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-[#37375B] mb-3">
                  Endereço
                </h3>
                <div className="text-sm text-gray-600">
                  {formData.address.endereco}, {formData.address.numero} -{" "}
                  {formData.address.bairro}
                  <br />
                  {formData.address.cidade} - CEP: {formData.address.cep}
                </div>
              </div>
            )}

            {/* Contractual Summary */}
            {formData.contractual && Object.keys(formData.contractual).length > 0 && (
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-[#37375B] mb-3">
                  Dados Contratuais
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Primeiro Emprego:</span>{" "}
                    {formData.contractual.primeiroEmprego === "sim" ? "Sim" : "Não"}
                  </div>
                  <div>
                    <span className="text-gray-600">PIS:</span>{" "}
                    {formData.contractual.numeroPIS}
                  </div>
                </div>
              </div>
            )}

            {/* Banking Summary */}
            {formData.banking && Object.keys(formData.banking).length > 0 && (
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-[#37375B] mb-3">
                  Dados Bancários
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Cliente Itaú:</span>{" "}
                    {formData.banking.isItauCustomer === "sim" ? "Sim" : "Não"}
                  </div>
                  <div>
                    <span className="text-gray-600">Agência:</span>{" "}
                    {formData.banking.agenciaBancaria}
                  </div>
                  <div>
                    <span className="text-gray-600">Conta:</span>{" "}
                    {formData.banking.numeroConta}-{formData.banking.digito}
                  </div>
                  <div>
                    <span className="text-gray-600">Tipo:</span>{" "}
                    {formData.banking.tipoConta}
                  </div>
                </div>
              </div>
            )}

            {/* Confirmation */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-sm text-gray-700 mb-4">
                Ao clicar em "Enviar", você confirma que todas as informações
                fornecidas são verdadeiras e está de acordo com os termos de uso
                da plataforma.
              </p>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="w-4 h-4" required />
                <span>
                  Li e aceito os termos de uso e política de privacidade
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/onboarding/9")}
              disabled={isSubmitting}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Voltar
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-torra-orange text-white hover:bg-torra-orange/90 disabled:bg-gray-400"
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
