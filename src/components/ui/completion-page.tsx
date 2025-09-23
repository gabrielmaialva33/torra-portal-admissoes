"use client";

import { useState } from "react";
import Image from "next/image";

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
      {/* Elementos decorativos de fundo - seguindo coordenadas do Figma */}
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <svg
          className="absolute"
          style={{
            left: "506.25px",
            top: "79.75px",
            width: "928.46px",
            height: "747.7px",
          }}
          viewBox="0 0 929 748"
          fill="none"
          aria-hidden="true"
        >
          {/* Linha diagonal principal */}
          <path
            d="M18.05 12.05L907.67 737.24"
            stroke="#FFCCB6"
            strokeWidth="2"
          />
          {/* Círculo inferior esquerdo */}
          <circle cx="144.42" cy="675.42" r="7.24" fill="#FFCCB6" />
          {/* Círculo superior direito */}
          <circle cx="909.73" cy="302.32" r="5.59" fill="#FFCCB6" />
        </svg>
      </div>

      {/* Conteúdo principal - posicionamento absoluto exato do Figma */}
      <div className="relative z-10">
        {/* Conteúdo de texto - posição ajustada */}
        <div
          className="absolute flex flex-col"
          style={{
            left: "536px",
            top: "200px",
            width: "424px",
            gap: "24px",
          }}
        >
          {/* Título */}
          <h1 className="text-[32px] font-normal leading-[38px] text-[#37375B] font-sofia">
            Obrigada!{"\n"}
            Que ótimo, você finalizou{"\n"}o cadastro! 🎉
          </h1>

          {/* Texto explicativo */}
          <p className="text-base leading-6 text-[#5F5F5F] font-sofia">
            Após preencher todos os dados solicitados, é só clicar em
            "finalizar". Se precisarmos corrigir ou completar algo, entraremos
            em contato com você pelo WhatsApp, combinado?
            <br />
            <br />
            Estando tudo certo, seguiremos com o processo e avisaremos sobre os
            próximos passos.
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
                className="relative flex items-center justify-center w-4 h-4 border border-[#FF5101] rounded-[3px] cursor-pointer"
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

        {/* Arco tracejado decorativo */}
        <svg
          className="absolute"
          style={{
            left: "1100px",
            top: "180px",
            width: "400px",
            height: "200px",
          }}
          viewBox="0 0 400 200"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M 40 170 Q 200 30 360 170"
            stroke="#FFCCB6"
            strokeWidth="2"
            strokeDasharray="10 7"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
        </svg>

        {/* Ícone do foguete - posição ajustada */}
        <div
          className="absolute"
          style={{
            left: "1236px",
            top: "320px",
            width: "100px",
            height: "100px",
          }}
        >
          {/* Círculo externo com borda */}
          <div
            className="absolute inset-0 rounded-full border-[5px]"
            style={{ borderColor: "#FF5101" }}
          />
          {/* Círculo interno */}
          <div
            className="absolute rounded-full"
            style={{
              backgroundColor: "#FBE2D7",
              left: "6.9px",
              top: "6.9px",
              width: "86.21px",
              height: "86.21px",
            }}
          />
          {/* Ícone do foguete */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              left: "25px",
              top: "25px",
              width: "50px",
              height: "50px",
            }}
          >
            <Image
              src="/images/figma/icon-rocket.svg"
              alt="Rocket"
              width={42}
              height={42}
              className="w-[42px] h-[42px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
