"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, FileText, Clock, Shield } from "lucide-react";
import Link from "next/link";
import { useOnboardingStore } from "@/stores/onboarding-store";

export default function HomePage() {
  const { currentStep, completedSteps, resetOnboarding } = useOnboardingStore();
  const hasStarted = currentStep > 1 || completedSteps.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">Portal Torra</h1>
              <p className="text-muted-foreground">Sistema de Admissão</p>
            </div>
            <Badge variant="secondary" className="text-sm">
              Admissão
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Welcome Card */}
          <Card className="border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl">Bem vindo(a)!</CardTitle>
              <CardTitle className="text-2xl mt-2">
                É muito bom ter você com a gente.
              </CardTitle>
              <CardDescription className="text-lg mt-4">
                Parabéns pela sua seleção para a vaga! 🎉
              </CardDescription>
              <CardDescription className="text-base mt-2 max-w-2xl">
                Para darmos os próximos passos e formalizar sua chegada ao nosso
                time, pedimos a gentileza de preencher seus dados pessoais no
                formulário abaixo. Para facilitar, já separe seus documentos,
                ok?
              </CardDescription>
              <CardDescription className="text-base mt-2">
                Estamos muito felizes em ter você a bordo!
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              {hasStarted ? (
                <div className="text-center space-y-4">
                  <p className="text-lg">
                    Você tem um processo de admissão em andamento.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Link href={`/onboarding/${currentStep}`}>
                      <Button size="lg">
                        Continuar do Passo {currentStep}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        if (
                          confirm(
                            "Tem certeza que deseja recomeçar? Todo o progresso será perdido.",
                          )
                        ) {
                          resetOnboarding();
                        }
                      }}
                    >
                      Recomeçar
                    </Button>
                  </div>
                </div>
              ) : (
                <Link href="/onboarding/1">
                  <Button size="lg" className="text-lg px-8">
                    Começar
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Processo Simples</CardTitle>
                    <CardDescription>
                      10 passos fáceis para completar sua admissão
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Upload de Documentos</CardTitle>
                    <CardDescription>
                      Envie todos os documentos necessários com segurança
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Clock className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Salve o Progresso</CardTitle>
                    <CardDescription>
                      Continue de onde parou a qualquer momento
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Seguro e Privado</CardTitle>
                    <CardDescription>
                      Seus dados são criptografados e protegidos
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Steps Overview */}
          <Card>
            <CardHeader>
              <CardTitle>O que esperar</CardTitle>
              <CardDescription>
                O processo de admissão consiste nas seguintes etapas:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2">
                {[
                  "Dados Gerais",
                  "Dependentes",
                  "Endereço",
                  "Dados Contratuais",
                  "Dados PCD",
                  "Vale Transporte",
                  "Dados Estrangeiro",
                  "Dados Aprendiz",
                  "Dados Bancários",
                  "Finalização",
                ].map((step, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Badge
                      variant="outline"
                      className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
                    >
                      {index + 1}
                    </Badge>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            © 2025 Torra. Todos os direitos reservados. |
            <span className="ml-1">
              Precisa de ajuda? Entre em contato com o RH em rh@torra.com.br
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
