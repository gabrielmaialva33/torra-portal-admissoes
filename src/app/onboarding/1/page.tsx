"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Header } from "@/components/ui/header";
import { Stepper } from "@/components/ui/stepper";
import { maskCPF, maskPhone } from "@/lib/masks";

export default function OnboardingStep1() {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    nomeSocial: "",
    dataNascimento: "",
    celular: "",
    nomePai: "",
    nomeMae: "",
    numeroRG: "",
    dataEmissaoRG: "",
    orgaoEmissor: "",
    cpf: "",
    estadoCivil: "",
    grauEscolaridade: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    foto: null as File | null,
    rg: null as File | null,
    cpf: null as File | null,
    certidaoCasamento: null as File | null,
    reservista: null as File | null,
    diploma: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (fileType: keyof typeof uploadedFiles) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = fileType === "foto" ? "image/*" : ".pdf,.jpg,.jpeg,.png";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setUploadedFiles((prev) => ({
          ...prev,
          [fileType]: file,
        }));
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] animate-fade-in">
      <Header />
      <Breadcrumb currentPage="Admissão" />

      {/* Stepper */}
      <Stepper currentStep={1} totalSteps={10} />

      {/* Main Content */}
      <main className="w-full max-w-[1144px] mx-auto px-8 mt-6">
        {/* Form Section */}
        <div className="flex gap-10">
          {/* Left side - Photo */}
          <div className="flex flex-col items-center gap-3 w-[256px] flex-shrink-0">
            <div className="relative">
              <div className="w-[232px] h-[232px] rounded-full bg-[#999999] flex items-center justify-center overflow-hidden">
                {uploadedFiles.foto ? (
                  <Image
                    src={URL.createObjectURL(uploadedFiles.foto)}
                    alt="Profile photo"
                    width={232}
                    height={232}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                ) : (
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Avatar placeholder</title>
                    <path
                      d="M3 20.9998C3 20.9998 3 20.4851 3.75 19.0952C4.63494 17.4587 6.31964 15.9998 9 15.9998C10.0256 15.9998 10.9264 16.1298 11.7223 16.35"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.5 19.5L18 21L22 17"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="9"
                      cy="9"
                      r="3"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                  </svg>
                )}
              </div>
              <button
                type="button"
                aria-label="Enviar ou alterar foto"
                onClick={() => handleFileUpload("foto")}
                className="absolute bottom-2 right-2 w-[45px] h-[45px] bg-[#37375B] rounded-full flex items-center justify-center hover:bg-[#2a2a4a] transition-all duration-200 hover:scale-110 active:scale-95"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Editar foto</title>
                  <path
                    d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
            <span className="text-[#5F5F5F] text-base">Foto*</span>
          </div>

          {/* Right side - Form Fields */}
          <div className="flex-1">
            {/* Line 1 - Nome Completo e Nome Social */}
            <div className="flex gap-10 mb-6">
              <div className="flex-1">
                <label className="block text-[#5F5F5F] text-base mb-2">
                  Nome completo*
                </label>
                <input
                  type="text"
                  name="nomeCompleto"
                  value={formData.nomeCompleto}
                  onChange={handleInputChange}
                  placeholder="Digite seu nome completo"
                  className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-[#5F5F5F] text-base mb-2">
                  Nome social
                </label>
                <input
                  type="text"
                  name="nomeSocial"
                  value={formData.nomeSocial}
                  onChange={handleInputChange}
                  placeholder="Digite seu nome social (opcional)"
                  className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
                />
              </div>
            </div>

            {/* Line 2 - Data de Nascimento e Celular */}
            <div className="flex gap-10 mb-6">
              <div className="flex-1">
                <label className="block text-[#5F5F5F] text-base mb-2">
                  Data de nascimento*
                </label>
                <input
                  type="date"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-[#5F5F5F] text-base mb-2">
                  Número de celular com DDD*
                </label>
                <input
                  type="tel"
                  name="celular"
                  value={maskPhone(formData.celular)}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, "");
                    if (rawValue.length <= 11) {
                      handleInputChange({
                        ...e,
                        target: {
                          ...e.target,
                          name: "celular",
                          value: rawValue,
                        },
                      } as React.ChangeEvent<HTMLInputElement>);
                    }
                  }}
                  placeholder="(00) 00000-0000"
                  className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
                  required
                />
              </div>
            </div>

            {/* Line 3 - Nome do Pai e Nome da Mãe */}
            <div className="flex gap-10 mb-6">
              <div className="flex-1">
                <label className="block text-[#5F5F5F] text-base mb-2">
                  Nome do pai
                </label>
                <input
                  type="text"
                  name="nomePai"
                  value={formData.nomePai}
                  onChange={handleInputChange}
                  placeholder="Digite o nome do pai"
                  className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[#5F5F5F] text-base mb-2">
                  Nome da mãe
                </label>
                <input
                  type="text"
                  name="nomeMae"
                  value={formData.nomeMae}
                  onChange={handleInputChange}
                  placeholder="Digite o nome da mãe"
                  className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Line 4 - Número do RG e Data de Emissão */}
        <div className="flex gap-10 mb-6">
          <div className="flex-1 max-w-[552px]">
            <label className="block text-[#5F5F5F] text-base mb-2">
              Número do RG*
            </label>
            <input
              type="text"
              name="numeroRG"
              value={formData.numeroRG}
              onChange={handleInputChange}
              placeholder="Digite o número do RG"
              className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
              required
            />
          </div>
          <div className="flex-1 max-w-[552px]">
            <label className="block text-[#5F5F5F] text-base mb-2">
              Data de emissão*
            </label>
            <input
              type="date"
              name="dataEmissaoRG"
              value={formData.dataEmissaoRG}
              onChange={handleInputChange}
              className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
              required
            />
          </div>
        </div>

        {/* Line 5 - Órgão Emissor e CPF */}
        <div className="flex gap-10 mb-6">
          <div className="flex-1 max-w-[552px]">
            <label className="block text-[#5F5F5F] text-base mb-2">
              Órgão emissor*
            </label>
            <input
              type="text"
              name="orgaoEmissor"
              value={formData.orgaoEmissor}
              onChange={handleInputChange}
              placeholder="Ex: SSP-SP"
              className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
              required
            />
          </div>
          <div className="flex-1 max-w-[552px]">
            <label className="block text-[#5F5F5F] text-base mb-2">CPF*</label>
            <input
              type="text"
              name="cpf"
              value={maskCPF(formData.cpf)}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                if (rawValue.length <= 11) {
                  handleInputChange({
                    ...e,
                    target: { ...e.target, name: "cpf", value: rawValue },
                  } as React.ChangeEvent<HTMLInputElement>);
                }
              }}
              placeholder="000.000.000-00"
              className="w-full h-12 px-4 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange transition-all duration-200 hover:border-[#999999]"
              required
            />
          </div>
        </div>

        {/* Line 6 - Estado Civil e Grau de Escolaridade */}
        <div className="flex gap-10 mb-10">
          <div className="flex-1 max-w-[552px]">
            <label className="block text-[#5F5F5F] text-base mb-2">
              Estado civil
            </label>
            <div className="relative">
              <select
                name="estadoCivil"
                value={formData.estadoCivil}
                onChange={handleInputChange}
                className="w-full h-12 px-4 pr-10 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange appearance-none transition-all duration-200 hover:border-[#999999] cursor-pointer"
              >
                <option value="">Selecione</option>
                <option value="solteiro">Solteiro(a)</option>
                <option value="casado">Casado(a)</option>
                <option value="divorciado">Divorciado(a)</option>
                <option value="viuvo">Viúvo(a)</option>
                <option value="uniao_estavel">União Estável</option>
              </select>
              <svg
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
          <div className="flex-1 max-w-[552px]">
            <label className="block text-[#5F5F5F] text-base mb-2">
              Grau de escolaridade
            </label>
            <div className="relative">
              <select
                name="grauEscolaridade"
                value={formData.grauEscolaridade}
                onChange={handleInputChange}
                className="w-full h-12 px-4 pr-10 border border-[#D6D6D6] rounded bg-white text-neutral-900 placeholder:text-[#AAAAAA] text-base focus:outline-none focus:border-torra-orange appearance-none transition-all duration-200 hover:border-[#999999] cursor-pointer"
              >
                <option value="">Selecione</option>
                <option value="fundamental_incompleto">
                  Ensino Fundamental Incompleto
                </option>
                <option value="fundamental_completo">
                  Ensino Fundamental Completo
                </option>
                <option value="medio_incompleto">
                  Ensino Médio Incompleto
                </option>
                <option value="medio_completo">Ensino Médio Completo</option>
                <option value="superior_incompleto">
                  Ensino Superior Incompleto
                </option>
                <option value="superior_completo">
                  Ensino Superior Completo
                </option>
                <option value="pos_graduacao">Pós-Graduação</option>
              </select>
              <svg
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

        {/* Divider */}
        <div className="w-[600px] h-[2px] bg-[#D9D9D9] mx-auto mb-10"></div>

        {/* Document Upload Section */}
        <div className="mb-10">
          <p className="text-[#5F5F5F] text-base mb-10 text-center">
            Agora, faça o envio dos documentos abaixo.
          </p>

          <div className="grid grid-cols-1 gap-4 max-w-[1144px] mx-auto">
            {/* RG Upload */}
            <button
              onClick={() => handleFileUpload("rg")}
              className="flex items-center gap-2 py-2 px-2 border border-[#E0E0E0] rounded-lg hover:border-torra-orange transition-all duration-200 bg-white min-h-[56px] hover:shadow-sm active:scale-[0.98]"
            >
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center flex-shrink-0">
                <svg
                  width="20"
                  height="24"
                  viewBox="0 0 20 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22H16C17.1 22 18 21.1 18 20V9L11 2Z"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 2V9H18"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 12H6"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 16H6"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 8H6"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-[#5F5F5F] text-sm text-center flex-1">
                {uploadedFiles.rg
                  ? uploadedFiles.rg.name
                  : "Clique aqui para anexar seu RG*"}
              </span>
            </button>

            {/* CPF Upload */}
            <button
              onClick={() => handleFileUpload("cpf")}
              className="flex items-center gap-2 py-2 px-2 border border-[#E0E0E0] rounded-lg hover:border-torra-orange transition-all duration-200 bg-white min-h-[56px] hover:shadow-sm active:scale-[0.98]"
            >
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center flex-shrink-0">
                <svg
                  width="20"
                  height="24"
                  viewBox="0 0 20 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22H16C17.1 22 18 21.1 18 20V9L11 2Z"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 2V9H18"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 12H6"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 16H6"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 8H6"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-[#5F5F5F] text-sm text-center flex-1">
                {uploadedFiles.cpf
                  ? uploadedFiles.cpf.name
                  : "Clique aqui para anexar seu CPF*"}
              </span>
            </button>

            {/* Certidão de Casamento Upload */}
            <button
              onClick={() => handleFileUpload("certidaoCasamento")}
              className="flex items-center gap-2 py-2 px-2 border border-[#E0E0E0] rounded-lg hover:border-torra-orange transition-all duration-200 bg-white min-h-[56px] hover:shadow-sm active:scale-[0.98]"
            >
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center flex-shrink-0">
                <svg
                  width="20"
                  height="24"
                  viewBox="0 0 20 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22H16C17.1 22 18 21.1 18 20V9L11 2Z"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 2V9H18"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 12H6"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 16H6"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 8H6"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-[#5F5F5F] text-sm text-center flex-1">
                {uploadedFiles.certidaoCasamento
                  ? uploadedFiles.certidaoCasamento.name
                  : "Clique aqui para anexar sua Certidão de casamento"}
              </span>
            </button>

            {/* Reservista Upload */}
            <button
              onClick={() => handleFileUpload("reservista")}
              className="flex items-center gap-2 py-2 px-2 border border-[#E0E0E0] rounded-lg hover:border-torra-orange transition-all duration-200 bg-white min-h-[56px] hover:shadow-sm active:scale-[0.98]"
            >
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center flex-shrink-0">
                <svg
                  width="20"
                  height="24"
                  viewBox="0 0 20 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22H16C17.1 22 18 21.1 18 20V9L11 2Z"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 2V9H18"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 12H6"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 16H6"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 8H6"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-[#5F5F5F] text-sm text-center flex-1">
                {uploadedFiles.reservista
                  ? uploadedFiles.reservista.name
                  : "Clique aqui para anexar sua Reservista"}
              </span>
            </button>

            {/* Diploma Upload */}
            <button
              onClick={() => handleFileUpload("diploma")}
              className="flex items-center gap-2 py-2 px-2 border border-[#E0E0E0] rounded-lg hover:border-torra-orange transition-all duration-200 bg-white min-h-[56px] hover:shadow-sm active:scale-[0.98]"
            >
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center flex-shrink-0">
                <svg
                  width="20"
                  height="24"
                  viewBox="0 0 20 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22H16C17.1 22 18 21.1 18 20V9L11 2Z"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 2V9H18"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 12H6"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 16H6"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 8H6"
                    stroke="#D6D6D6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-[#5F5F5F] text-sm text-center flex-1">
                {uploadedFiles.diploma
                  ? uploadedFiles.diploma.name
                  : "Clique aqui para anexar seu Diploma ou certificado de escolaridade"}
              </span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end mb-10">
          <button className="px-6 py-4 bg-[#37375B] text-white text-sm rounded hover:bg-[#2a2a4a] transition-all duration-200 min-w-[107px] hover:shadow-lg active:scale-[0.98]">
            Salvar
          </button>
          <Link
            href="/onboarding/2"
            className="px-6 py-4 bg-[#AAAAAA] text-white text-sm rounded hover:bg-[#999999] transition-all duration-200 text-center min-w-[107px] flex items-center justify-center hover:shadow-lg active:scale-[0.98]"
          >
            Próximo
          </Link>
        </div>
      </main>
    </div>
  );
}
