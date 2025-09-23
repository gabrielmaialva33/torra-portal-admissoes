"use client";

import { FileText, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface DocumentUploadProps {
  title: string;
  accept?: string;
  maxSize?: number;
  onUpload?: (file: File) => void;
  onRemove?: () => void;
  className?: string;
}

export function DocumentUpload({
  title,
  accept = ".pdf,.jpg,.jpeg,.png",
  maxSize = 5 * 1024 * 1024, // 5MB
  onUpload,
  onRemove,
  className,
}: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setError("");

    // Validate file size
    if (file.size > maxSize) {
      setError(`Arquivo muito grande. Máximo ${maxSize / (1024 * 1024)}MB`);
      return;
    }

    // Validate file type
    const fileType = `.${file.name.split(".").pop()?.toLowerCase()}`;
    if (accept && !accept.includes(fileType)) {
      setError("Tipo de arquivo não permitido");
      return;
    }

    setFile(file);
    if (onUpload) {
      onUpload(file);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setError("");
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {!file ? (
        <>
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            onChange={handleChange}
            accept={accept}
          />
          <button
            type="button"
            className={cn(
              "relative border-2 border-dashed rounded-lg p-6 transition-colors",
              dragActive
                ? "border-primary bg-primary/5"
                : "border-gray-300 hover:border-gray-400",
              error && "border-red-500",
            )}
            aria-label={`Área para enviar ${title}. Clique ou arraste e solte um arquivo`}
            onClick={() => inputRef.current?.click()}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="p-3 bg-gray-100 rounded-full">
                <Upload className="w-6 h-6 text-gray-600" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">
                  Clique aqui para anexar seu {title}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  ou arraste e solte o arquivo
                </p>
              </div>
              <p className="text-xs text-gray-400">
                PDF, JPG, PNG até {maxSize / (1024 * 1024)}MB
              </p>
            </div>
          </button>
        </>
      ) : (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white rounded">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      )}
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </div>
  );
}
