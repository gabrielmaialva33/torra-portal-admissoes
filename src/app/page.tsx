"use client";

import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Header } from "@/components/ui/header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-bg">
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <Breadcrumb currentPage="Admissão" />

      {/* Main Content */}
      <main className="relative flex items-center justify-center min-h-[calc(100vh-200px)] px-8">
        {/* Central Content with decorative background */}
        <div className="relative flex flex-col items-center text-center max-w-[720px]">
          {/* Rocket Icon with Circle and decorative arc */}
          <div className="mb-10 relative">
            {/* Decorative dashed arc behind the rocket */}
            <svg
              className="absolute -top-[30px] left-1/2 -translate-x-1/2 w-[300px] h-[160px] pointer-events-none"
              viewBox="0 0 300 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 30 130 Q 150 20 270 130"
                stroke="#FFCCB6"
                strokeWidth="2"
                strokeDasharray="8 6"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />
            </svg>

            <div className="relative w-[100px] h-[100px] z-10">
              {/* Orange ring */}
              <div className="absolute inset-0 rounded-full border-[5px] border-torra-orange"></div>
              {/* Light orange background circle */}
              <div className="absolute inset-[5px] rounded-full bg-[#FBE2D7]"></div>
              {/* Rocket icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/images/figma/icon-rocket.svg"
                  alt="Rocket"
                  width={42}
                  height={42}
                  className="relative z-10"
                />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[32px] leading-[40px] font-bold text-torra-dark-blue mb-6">
            Bem vindo(a)!
            <br />É muito bom ter você com a gente.
          </h1>

          {/* Description */}
          <div className="mb-10 max-w-[600px]">
            <p className="text-base text-neutral-05 leading-[26px] mb-4">
              <span className="font-semibold">
                Parabéns pela sua seleção para a vaga! 🎉
              </span>
            </p>
            <p className="text-base text-neutral-05 leading-[26px] mb-4">
              Para darmos os próximos passos e formalizar sua chegada ao nosso
              time, pedimos a gentileza de preencher seus dados pessoais no
              formulário abaixo. Para facilitar, já separe seus documentos, ok?
            </p>
            <p className="text-base text-neutral-05 leading-[26px]">
              Estamos muito felizes em ter você a bordo!
            </p>
          </div>

          {/* Start Button */}
          <Link
            href="/onboarding/1"
            className="inline-flex items-center justify-center bg-torra-orange text-neutral-01 hover:bg-torra-orange/90 px-8 py-4 text-base font-medium rounded-sm transition-colors min-w-[160px]"
          >
            Começar
          </Link>
        </div>
      </main>
    </div>
  );
}
