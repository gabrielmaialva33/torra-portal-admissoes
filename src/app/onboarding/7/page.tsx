"use client";

import { useState } from "react";
import { ForeignerForm } from "@/components/ui/foreigner-form";
import { ForeignerUpload } from "@/components/ui/foreigner-upload";
import { PageLayout } from "@/components/ui/page-layout";
import type { ForeignerFormData } from "@/types/foreigner";

export default function Step7Page() {
  const [formData, setFormData] = useState<ForeignerFormData>({
    isForeigner: "",
    dataChegada: "",
    numeroRNE: "",
    nacionalidade: "",
    dataExpedicao: "",
    documentoRNE: null,
  });

  const handleFormUpdate = (data: ForeignerFormData) => {
    setFormData(data);
  };

  const handleFileSelect = (file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      documentoRNE: file,
    }));
  };

  const isFormValid = () => {
    if (formData.isForeigner === "nao") {
      return true;
    }

    if (formData.isForeigner === "sim") {
      return (
        formData.numeroRNE.trim() !== "" &&
        formData.nacionalidade !== "" &&
        formData.dataExpedicao !== "" &&
        formData.documentoRNE !== null
      );
    }

    return false;
  };

  const showUpload = formData.isForeigner === "sim";

  return (
    <PageLayout
      currentStep={7}
      title="Dados de Estrangeiro"
      subtitle="Informe se você é estrangeiro e preencha os dados necessários."
      onNext={() => console.log("Next step")}
      onPrevious={() => console.log("Previous step")}
      isValid={isFormValid()}
    >
      <div className="space-y-8">
        <ForeignerForm onUpdate={handleFormUpdate} />

        {showUpload && (
          <>
            <div className="w-full h-px bg-[#EEEEEE]" />
            <ForeignerUpload onFileSelect={handleFileSelect} />
          </>
        )}
      </div>
    </PageLayout>
  );
}
