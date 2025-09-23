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
        {/* Background Decorative Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Left dashed curved line */}
          <svg
            className="absolute left-0 top-[20%] w-[45%]"
            viewBox="0 0 600 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 250C150 200 250 150 350 120C450 90 550 50 600 10"
              stroke="#FFCCB6"
              strokeWidth="2"
              strokeDasharray="10 10"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>

          {/* Right dashed curved line */}
          <svg
            className="absolute right-0 top-[25%] w-[45%]"
            viewBox="0 0 600 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M550 250C450 200 350 150 250 120C150 90 50 50 0 10"
              stroke="#FFCCB6"
              strokeWidth="2"
              strokeDasharray="10 10"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Central Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-[720px]">
          {/* Rocket Icon with Circle */}
          <div className="mb-10">
            <div className="relative w-[100px] h-[100px]">
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
