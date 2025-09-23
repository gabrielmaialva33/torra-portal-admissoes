"use client";

import { RotateCcw, Trash2, X } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useCallback, useState } from "react";

interface FileUploadProps {
  label: string;
  required?: boolean;
  accept?: string;
  onFileSelect?: (file: File | null) => void;
  className?: string;
}

type UploadState = "idle" | "uploading" | "success" | "error";

export function FileUpload({
  label,
  required = false,
  accept = "*",
  onFileSelect,
  className = "",
}: FileUploadProps) {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string>("");

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setFileName(file.name);
      setUploadState("uploading");
      setProgress(0);

      // Simular upload com progresso
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Simular sucesso ou erro aleatoriamente para demonstração
            const success = Math.random() > 0.3; // 70% chance de sucesso
            setUploadState(success ? "success" : "error");
            if (success && onFileSelect) {
              onFileSelect(file);
            }
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 100);
    },
    [onFileSelect],
  );

  const handleCancel = () => {
    setUploadState("idle");
    setProgress(0);
    setFileName("");
    if (onFileSelect) {
      onFileSelect(null);
    }
  };

  const handleRetry = () => {
    setUploadState("uploading");
    setProgress(0);

    // Simular retry
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState("success");
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
  };

  const handleRemove = () => {
    setUploadState("idle");
    setProgress(0);
    setFileName("");
    if (onFileSelect) {
      onFileSelect(null);
    }
  };

  const renderContent = () => {
    switch (uploadState) {
      case "idle":
        return (
          <>
            <div className="flex items-center gap-3">
              <Image
                src="/images/figma/icon-upload.svg"
                alt="Upload icon"
                width={20}
                height={24}
                className="flex-shrink-0"
              />
              <span className="text-sm text-[#5F5F5F]">
                Clique aqui para anexar seu {label}
                {required && <span className="text-[#FF5101]">*</span>}
              </span>
            </div>
          </>
        );

      case "uploading":
        return (
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/figma/icon-upload.svg"
                  alt="Upload icon"
                  width={20}
                  height={24}
                  className="flex-shrink-0"
                />
                <span className="text-sm text-[#5F5F5F]">
                  Anexando seu {label}
                  {required && <span className="text-[#FF5101]">*</span>}
                </span>
              </div>
              <button
                onClick={handleCancel}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                type="button"
              >
                <X className="w-4 h-4 text-[#5F5F5F]" />
              </button>
            </div>
            <div className="text-xs text-[#5F5F5F] mb-2">
              {fileName} - {Math.round(progress)}%
            </div>
            <div className="w-full bg-[#E0E0E0] rounded-full h-1">
              <div
                className="bg-[#FF5101] h-1 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        );

      case "error":
        return (
          <div className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/figma/icon-upload.svg"
                  alt="Upload icon"
                  width={20}
                  height={24}
                  className="flex-shrink-0"
                />
                <span className="text-sm text-red-500">
                  Clique aqui para anexar seu {label}
                  {required && <span className="text-[#FF5101]">*</span>}
                </span>
                <span className="text-sm text-red-500 font-medium">Erro</span>
              </div>
              <button
                onClick={handleRetry}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                type="button"
              >
                <RotateCcw className="w-4 h-4 text-[#5F5F5F]" />
              </button>
            </div>
          </div>
        );

      case "success":
        return (
          <div className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/figma/icon-upload.svg"
                  alt="Upload icon"
                  width={20}
                  height={24}
                  className="flex-shrink-0"
                />
                <span className="text-sm text-[#5F5F5F]">
                  Upload do seu {label} Completo
                  {required && <span className="text-[#FF5101]">*</span>}
                </span>
              </div>
              <button
                onClick={handleRemove}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                type="button"
              >
                <Trash2 className="w-4 h-4 text-[#5F5F5F]" />
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const triggerFileSelect = () => {
    if (uploadState !== "idle") return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFileSelect(e as any);
      }
    };
    input.click();
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          border border-[#D6D6D6] rounded-[4px] p-4 transition-all duration-300
          ${uploadState === "error" ? "border-red-300 bg-red-50" : ""}
          ${uploadState === "success" ? "border-[#D6D6D6] bg-white" : ""}
          ${uploadState === "idle" ? "hover:border-[#FF5101] hover:bg-[#FBE2D7]/30 cursor-pointer" : ""}
          ${uploadState === "uploading" ? "border-[#FF5101] bg-[#FBE2D7]/30" : ""}
        `}
        onClick={triggerFileSelect}
      >
        {renderContent()}
      </div>
    </div>
  );
}
