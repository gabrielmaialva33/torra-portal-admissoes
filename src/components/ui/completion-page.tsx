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
        {/* Forma decorativa 1 - superior esquerda */}
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

      {/* Conteúdo principal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
        <div className="flex items-center gap-16 max-w-6xl w-full">
          {/* Conteúdo de texto */}
          <div className="w-[424px] flex flex-col gap-6">
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
              Estando tudo certo, seguiremos com o processo e avisaremos sobre
              os próximos passos.
              <br />
              <br />
              Estamos animados! 😊
            </p>

            {/* Checkbox de confirmação */}
            <div className="flex items-center gap-2 mt-6">
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

          {/* Ícone decorativo */}
          <div className="relative ml-auto">
            <div className="relative w-[100px] h-[100px]">
              {/* Círculo externo com borda */}
              <div
                className="absolute inset-0 rounded-full border-[5px]"
                style={{ borderColor: "#FF5101" }}
              />
              {/* Círculo interno */}
              <div
                className="absolute inset-[7px] rounded-full"
                style={{ backgroundColor: "#FBE2D7" }}
              />
              {/* Ícone do foguete */}
              <div className="absolute inset-[25px] flex items-center justify-center">
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                  role="img"
                  aria-label="Rocket icon"
                >
                  <path
                    d="M21 4L15 10V18L9 24V32L13 28H17V24L21 20L25 24V28H29L33 32V24L27 18V10L21 4Z"
                    fill="#FF5101"
                  />
                  <path
                    d="M19 12C19 13.1 18.1 14 17 14C15.9 14 15 13.1 15 12C15 10.9 15.9 10 17 10C18.1 10 19 10.9 19 12Z"
                    fill="white"
                  />
                  <path d="M9 32L5 36L6 38L8 37L9 32Z" fill="#FF5101" />
                  <path d="M33 32L34 37L36 38L37 36L33 32Z" fill="#FF5101" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
