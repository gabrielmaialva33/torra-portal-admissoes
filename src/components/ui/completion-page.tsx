"use client";

import { useState } from "react";

interface CompletionPageProps {
  onFinalize: () => void;
}

export function CompletionPage({ onFinalize }: CompletionPageProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsConfirmed(e.target.checked);
  };

  const handleFinalize = () => {
    if (isConfirmed) {
      onFinalize();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F8F8F8] overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        {/* Forma decorativa 1 - linha diagonal com círculos */}
        <svg
          className="absolute top-20 left-[500px]"
          width="930"
          height="750"
          viewBox="0 0 930 750"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M18 12C18 12 907 737 920 737"
            stroke="#FFCCB6"
            strokeWidth="2"
          />
          <circle cx="145" cy="690" r="7" fill="#FFCCB6" />
          <circle cx="920" cy="315" r="6" fill="#FFCCB6" />
        </svg>
      </div>

      {/* Layout principal - dois colunas */}
      <div className="relative z-10 flex items-center justify-between min-h-screen px-8">
        <div className="flex items-center gap-16 max-w-6xl w-full">
          {/* Coluna esquerda - Conteúdo de texto */}
          <div className="w-[424px] flex flex-col gap-12">
            {/* Título */}
            <h1 className="text-[32px] font-normal leading-[38px] text-[#37375B] font-sofia">
              Obrigada!{"\n"}
              Que ótimo, você finalizou{"\n"}
              o cadastro! 🎉
            </h1>

            {/* Texto explicativo */}
            <p className="text-base leading-6 text-[#5F5F5F] font-sofia">
              Após preencher todos os dados solicitados, é só clicar em
              "finalizar". Se precisarmos corrigir ou completar algo, entraremos
              em contato com você pelo WhatsApp, combinado?
              <br />
              <br />
              Estando tudo certo, seguiremos com o processo e avisaremos sobre
              os próximos passos.
              <br />
              <br />
              Estamos animados! 😊
            </p>

            {/* Checkbox de confirmação */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  id="confirmation"
                  type="checkbox"
                  checked={isConfirmed}
                  onChange={handleCheckboxChange}
                  className="sr-only"
                />
                <label
                  htmlFor="confirmation"
                  className="relative flex items-center justify-center w-4 h-4 border border-[#FF5101] rounded cursor-pointer"
                  style={{
                    backgroundColor: isConfirmed ? "#FF5101" : "transparent",
                  }}
                >
                  {isConfirmed && (
                    <svg
                      className="w-2 h-2"
                      viewBox="0 0 8 6"
                      fill="none"
                      role="img"
                      aria-label="Checkmark"
                    >
                      <path
                        d="M1 3L3 5L7 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </label>
              </div>
              <label
                htmlFor="confirmation"
                className="text-xs leading-[14px] text-[#AAAAAA] font-sofia cursor-pointer"
                style={{ width: "404px" }}
              >
                Confirmo que as informações são verdadeiras e de minha
                responsabilidade.
              </label>
            </div>

            {/* Botão Finalizar */}
            <button
              type="button"
              onClick={handleFinalize}
              disabled={!isConfirmed}
              className={`px-6 py-4 rounded text-sm font-bold transition-all duration-200 hover:shadow-lg active:scale-[0.98] ${
                isConfirmed
                  ? "bg-[#FF5101] text-white hover:bg-[#e8450a] cursor-pointer"
                  : "bg-[#AAAAAA] text-white cursor-not-allowed"
              }`}
              style={{ width: "fit-content" }}
            >
              Finalizar
            </button>
          </div>

          {/* Coluna direita - Ícone do foguete */}
          <div className="relative ml-auto">
            <div className="relative w-[100px] h-[100px]">
              {/* Círculo externo com borda */}
              <div
                className="absolute inset-0 rounded-full border-[5px]"
                style={{ borderColor: "#FF5101" }}
              />
              {/* Círculo interno */}
              <div
                className="absolute inset-[6.9px] rounded-full"
                style={{ backgroundColor: "#FBE2D7" }}
              />
              {/* Ícone do foguete - exato do Figma */}
              <div className="absolute inset-[25px] flex items-center justify-center">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                  role="img"
                  aria-label="Rocket icon"
                >
                  <path
                    d="M25 4.24L21.04 8.27L21.04 16.27L15.16 22.24L15.16 30.24L19.12 26.27L23.08 26.27L23.08 22.24L25 20.24L26.92 22.24L26.92 26.27L30.88 26.27L34.84 30.24L34.84 22.24L28.96 16.27L28.96 8.27L25 4.24Z"
                    fill="#FF5101"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
