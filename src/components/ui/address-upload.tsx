"use client";

import { FileUpload } from "@/components/ui/file-upload";

interface AddressUploadProps {
  onFileSelect: (file: File | null) => void;
  className?: string;
}

export function AddressUpload({
  onFileSelect,
  className = "",
}: AddressUploadProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <p className="text-[#5F5F5F] text-base text-center mb-6">
        Agora, faça o upload dos documentos necessários para continuar.
      </p>

      <FileUpload
        label="Comprovante de residência"
        required={true}
        accept=".pdf,.jpg,.jpeg,.png"
        onFileSelect={onFileSelect}
      />
    </div>
  );
}
