"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
              <h1 className="text-3xl font-bold text-primary">
                Torra Portal
              </h1>
              <p className="text-muted-foreground">
                Employee Admission System
              </p>
            </div>
            <Badge variant="secondary" className="text-sm">
              Version 1.0
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
              <CardTitle className="text-4xl">
                Welcome to Torra Employee Onboarding
              </CardTitle>
              <CardDescription className="text-lg mt-4">
                Complete your admission process in just 10 simple steps.
                All your information is securely saved as you progress.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              {hasStarted ? (
                <div className="text-center space-y-4">
                  <p className="text-lg">
                    You have an onboarding process in progress.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Link href={`/onboarding/${currentStep}`}>
                      <Button size="lg">
                        Continue from Step {currentStep}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        if (confirm("Are you sure you want to start over? All progress will be lost.")) {
                          resetOnboarding();
                        }
                      }}
                    >
                      Start Over
                    </Button>
                  </div>
                </div>
              ) : (
                <Link href="/onboarding/1">
                  <Button size="lg" className="text-lg px-8">
                    Start Onboarding Process
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
                    <CardTitle>Simple Process</CardTitle>
                    <CardDescription>
                      10 easy steps to complete your admission
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
                    <CardTitle>Document Upload</CardTitle>
                    <CardDescription>
                      Securely upload all required documents
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
                    <CardTitle>Save Progress</CardTitle>
                    <CardDescription>
                      Continue anytime from where you left off
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
                    <CardTitle>Secure & Private</CardTitle>
                    <CardDescription>
                      Your data is encrypted and protected
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Steps Overview */}
          <Card>
            <CardHeader>
              <CardTitle>What to Expect</CardTitle>
              <CardDescription>
                The onboarding process consists of the following steps:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2">
                {[
                  "Personal Information",
                  "Dependents",
                  "Address",
                  "Contract Details",
                  "Disability Information",
                  "Transport Voucher",
                  "Foreigner Data",
                  "Apprentice Information",
                  "Banking Details",
                  "Review & Submit"
                ].map((step, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Badge variant="outline" className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
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
            © 2025 Torra. All rights reserved. |
            <span className="ml-1">Need help? Contact HR at hr@torra.com.br</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
