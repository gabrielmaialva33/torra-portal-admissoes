"use client";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CompletionPage } from "@/components/ui/completion-page";
import { Header } from "@/components/ui/header";

export default function OnboardingStep10() {
  const handleFinalize = () => {
    console.log("Onboarding process finalized!");
    // Aqui você pode adicionar lógica para:
    // - Enviar dados finais para o servidor
    // - Redirecionar para página de sucesso
    // - Limpar dados do localStorage
    // - Enviar analytics de conclusão

    // Exemplo de redirecionamento futuro:
    // router.push('/welcome');

    alert("Parabéns! Seu cadastro foi finalizado com sucesso! 🎉");
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Header />
      <Breadcrumb currentPage="Admissão" />

      {/* Página de conclusão sem stepper */}
      <CompletionPage onFinalize={handleFinalize} />
    </div>
  );
}
