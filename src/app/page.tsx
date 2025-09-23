"use client";

import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Header } from "@/components/ui/header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-bg animate-fade-in">
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <Breadcrumb currentPage="Admissão" />

      {/* Main Content */}
      <main className="relative flex items-center justify-center min-h-[calc(100vh-200px)] px-4 md:px-8">
        {/* Central Content */}
        <div className="relative flex flex-col items-center text-center max-w-[720px] animate-slide-up"
          {/* Rocket Icon with Circle and decorative arc */}
          <div className="mb-6 md:mb-10 relative animate-float">
            {/* Decorative dashed arc behind the rocket icon */}
            <svg
              className="absolute -inset-x-[100px] md:-inset-x-[150px] -inset-y-[30px] md:-inset-y-[50px] w-[280px] md:w-[400px] h-[140px] md:h-[200px] pointer-events-none"
              viewBox="0 0 400 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Decorative arc</title>
              <path
                d="M 40 170 Q 200 30 360 170"
                stroke="#FFCCB6"
                strokeWidth="2"
                strokeDasharray="10 7"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
                className="animate-pulse-soft"
              />
            </svg>
            <div className="relative w-[80px] h-[80px] md:w-[100px] md:h-[100px] z-10 group">
              {/* Orange ring */}
              <div className="absolute inset-0 rounded-full border-[4px] md:border-[5px] border-torra-orange"></div>
              {/* Light orange background circle */}
              <div className="absolute inset-[4px] md:inset-[5px] rounded-full bg-[#FBE2D7]"></div>
              {/* Rocket icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/images/figma/icon-rocket.svg"
                  alt="Rocket"
                  width={42}
                  height={42}
                  className="relative z-10 w-8 h-8 md:w-[42px] md:h-[42px] group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-[32px] leading-[32px] md:leading-[40px] font-bold text-torra-dark-blue mb-4 md:mb-6">
            Bem vindo(a)!
            <br />É muito bom ter você com a gente.
          </h1>

          {/* Description */}
          <div className="mb-6 md:mb-10 max-w-[600px]">
            <p className="text-sm md:text-base text-neutral-05 leading-[22px] md:leading-[26px] mb-3 md:mb-4">
              <span className="font-semibold">
                Parabéns pela sua seleção para a vaga! 🎉
              </span>
            </p>
            <p className="text-sm md:text-base text-neutral-05 leading-[22px] md:leading-[26px] mb-3 md:mb-4">
              Para darmos os próximos passos e formalizar sua chegada ao nosso
              time, pedimos a gentileza de preencher seus dados pessoais no
              formulário abaixo. Para facilitar, já separe seus documentos, ok?
            </p>
            <p className="text-sm md:text-base text-neutral-05 leading-[22px] md:leading-[26px]">
              Estamos muito felizes em ter você a bordo!
            </p>
          </div>

          {/* Start Button */}
          <Link
            href="/onboarding/1"
            className="inline-flex items-center justify-center bg-torra-orange text-neutral-01 hover:bg-torra-orange/90 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium rounded-sm transition-all duration-300 w-full md:w-auto min-w-[160px] hover:shadow-lg hover:scale-105 active:scale-95"
          >
            Começar
          </Link>
        </div>
      </main>
    </div>
  );
}
