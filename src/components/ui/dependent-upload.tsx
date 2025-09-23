"use client";

import { FileUpload } from "@/components/ui/file-upload";

interface DependentUploadProps {
  onFileSelect: (
    documentType: "cpfFile" | "certidaoNascimento" | "documentoGuarda",
  ) => (file: File | null) => void;
  className?: string;
}

export function DependentUpload({
  onFileSelect,
  className = "",
}: DependentUploadProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Title */}
      <p className="text-[#5F5F5F] text-base text-center mb-6">
        Agora, faça o upload dos documentos necessários para continuar.
      </p>

      {/* Upload Areas */}
      <div className="space-y-4">
        <FileUpload
          label="CPF do dependente"
          required={true}
          accept=".pdf,.jpg,.jpeg,.png"
          onFileSelect={onFileSelect("cpfFile")}
        />

        <FileUpload
          label="Certidão de nascimento"
          required={true}
          accept=".pdf,.jpg,.jpeg,.png"
          onFileSelect={onFileSelect("certidaoNascimento")}
        />

        <FileUpload
          label="documento de guarda."
          required={true}
          accept=".pdf,.jpg,.jpeg,.png"
          onFileSelect={onFileSelect("documentoGuarda")}
        />
      </div>
    </div>
  );
}
