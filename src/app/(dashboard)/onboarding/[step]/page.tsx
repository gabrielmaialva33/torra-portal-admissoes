import { notFound } from "next/navigation";
import { OnboardingLayout } from "@/components/forms/onboarding-layout";
import { AddressStepForm } from "@/components/forms/steps/address-step-form";
import { ApprenticeStepForm } from "@/components/forms/steps/apprentice-step-form";
import { BankingStepForm } from "@/components/forms/steps/banking-step-form";
import { ContractualStepForm } from "@/components/forms/steps/contractual-step-form";
import { DependentsStepForm } from "@/components/forms/steps/dependents-step-form";
import { ForeignerStepForm } from "@/components/forms/steps/foreigner-step-form";
import { PCDStepForm } from "@/components/forms/steps/pcd-step-form";
import { PersonalDataForm } from "@/components/forms/steps/personal-data-form";
import { ReviewSubmitForm } from "@/components/forms/steps/review-submit-form";
import { TransportStepForm } from "@/components/forms/steps/transport-step-form";

const TOTAL_STEPS = 10;

// Generate static params for all steps (required for static export)
export async function generateStaticParams() {
  return Array.from({ length: TOTAL_STEPS }, (_, i) => ({
    step: (i + 1).toString(),
  }));
}

export default async function OnboardingStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  const stepNumber = parseInt(step, 10);

  if (Number.isNaN(stepNumber) || stepNumber < 1 || stepNumber > TOTAL_STEPS) {
    notFound();
  }

  const renderStepContent = () => {
    switch (stepNumber) {
      case 1:
        return <PersonalDataForm />;
      case 2:
        return <DependentsStepForm />;
      case 3:
        return <AddressStepForm />;
      case 4:
        return <ContractualStepForm />;
      case 5:
        return <PCDStepForm />;
      case 6:
        return <TransportStepForm />;
      case 7:
        return <ForeignerStepForm />;
      case 8:
        return <ApprenticeStepForm />;
      case 9:
        return <BankingStepForm />;
      case 10:
        return <ReviewSubmitForm />;
      default:
        return null;
    }
  };

  return (
    <OnboardingLayout currentStep={stepNumber}>
      {renderStepContent()}
    </OnboardingLayout>
  );
}
