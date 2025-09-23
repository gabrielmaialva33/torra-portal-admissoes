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
        {/* Conteúdo de texto - posição exata do Figma */}
        <div
          className="absolute flex flex-col"
          style={{
            left: "536px",
            top: "289px",
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

        {/* Ícone do foguete - posição exata do Figma */}
        <div
          className="absolute"
          style={{
            left: "1236px",
            top: "430px",
            width: "100px",
            height: "100px",
          }}
        >
          {/* Círculo externo com borda - exato do Figma */}
          <div
            className="absolute inset-0 rounded-full border-[5px]"
            style={{ borderColor: "#FF5101" }}
          />
          {/* Círculo interno - dimensões exatas do Figma */}
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
          {/* Ícone do foguete - mesmo da home page */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              left: "25px",
              top: "25px",
              width: "50px",
              height: "50px",
            }}
          >
            <svg
              width="43"
              height="42"
              viewBox="0 0 43 42"
              fill="none"
              role="img"
              aria-label="Rocket icon"
            >
              <path
                d="M5.87601 17.1843L11.4372 19.5452C12.0668 18.2861 12.7401 17.0444 13.4571 15.8203C14.1741 14.5961 14.9349 13.4244 15.7393 12.3051L11.5946 11.4657L5.87601 17.1843ZM13.9555 21.434L20.9333 28.4117C22.9269 27.5023 24.7982 26.4705 26.547 25.3163C28.2958 24.1621 29.7123 23.0429 30.7966 21.9586C33.6297 19.1255 35.7108 16.2225 37.0399 13.2495C38.369 10.2765 39.086 6.9188 39.1909 3.17634C35.4484 3.28127 32.0907 3.99829 29.1177 5.32738C26.1448 6.65648 23.2417 8.73757 20.4086 11.5706C19.3244 12.6549 18.2051 14.0714 17.0509 15.8203C15.8967 17.5691 14.8649 19.4403 13.9555 21.434ZM25.9699 16.3974C25.2703 15.6978 24.9206 14.8322 24.9206 13.8004C24.9206 12.7686 25.2703 11.9029 25.9699 11.2034C26.6694 10.5039 27.5351 10.1541 28.5669 10.1541C29.5987 10.1541 30.4643 10.5039 31.1638 11.2034C31.8634 11.9029 32.2131 12.7686 32.2131 13.8004C32.2131 14.8322 31.8634 15.6978 31.1638 16.3974C30.4643 17.0969 29.5987 17.4467 28.5669 17.4467C27.5351 17.4467 26.6694 17.0969 25.9699 16.3974ZM25.1829 36.4912L30.9015 30.7726L30.0621 26.6279C28.9429 27.4324 27.7712 28.1931 26.547 28.9101C25.3228 29.6271 24.0812 30.3004 22.822 30.93L25.1829 36.4912ZM42.2863 0.0809451C42.6011 4.83772 42.0065 9.17477 40.5025 13.0921C38.9985 17.0095 36.5152 20.6995 33.0526 24.1621L32.9476 24.267L32.8427 24.372L33.9969 30.143C34.1019 30.6677 34.0756 31.1748 33.9182 31.6645C33.7608 32.1542 33.4898 32.5914 33.105 32.9761L24.1336 42L19.6741 31.612L10.7552 22.6931L0.367251 18.2336L9.39113 9.26221C9.77586 8.87747 10.2131 8.60641 10.7027 8.44902C11.1924 8.29162 11.6996 8.26539 12.2242 8.37032L17.9953 9.52454C18.0303 9.48956 18.0652 9.46333 18.1002 9.44584C18.1352 9.42835 18.1702 9.40212 18.2051 9.36714C21.6678 5.90449 25.3578 3.41243 29.2751 1.89097C33.1925 0.369499 37.5295 -0.233841 42.2863 0.0809451ZM3.88236 29.0413C5.10653 27.8171 6.60177 27.1963 8.36807 27.1788C10.1344 27.1613 11.6296 27.7647 12.8538 28.9888C14.0779 30.213 14.6813 31.7082 14.6638 33.4745C14.6463 35.2408 14.0255 36.7361 12.8013 37.9602C11.8919 38.8696 10.4841 39.6216 8.57793 40.2162C6.67172 40.8108 3.81241 41.3704 0 41.8951C0.524644 38.0827 1.07552 35.2146 1.65263 33.2909C2.22974 31.3672 2.97298 29.9507 3.88236 29.0413ZM6.08587 31.2973C5.5962 31.8219 5.159 32.6438 4.77426 33.7631C4.38952 34.8823 4.05725 36.3164 3.77744 38.0652C5.52625 37.7854 6.96028 37.4531 8.07952 37.0683C9.19876 36.6836 10.0207 36.2464 10.5453 35.7567C11.2099 35.1621 11.5509 34.4189 11.5684 33.527C11.5859 32.6351 11.2798 31.8569 10.6503 31.1923C9.98572 30.5628 9.2075 30.2567 8.31561 30.2742C7.42371 30.2917 6.68047 30.6327 6.08587 31.2973Z"
                fill="#FF5101"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
