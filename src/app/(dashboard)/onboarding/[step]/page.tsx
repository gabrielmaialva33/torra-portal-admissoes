import { notFound } from "next/navigation";
import { OnboardingLayout } from "@/components/forms/onboarding-layout";
import { PersonalDataForm } from "@/components/forms/steps/personal-data-form";

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
        return <div>Dependents Form (Coming soon)</div>;
      case 3:
        return <div>Address Form (Coming soon)</div>;
      case 4:
        return <div>Contract Data Form (Coming soon)</div>;
      case 5:
        return <div>Disability Data Form (Coming soon)</div>;
      case 6:
        return <div>Transport Voucher Form (Coming soon)</div>;
      case 7:
        return <div>Foreigner Data Form (Coming soon)</div>;
      case 8:
        return <div>Apprentice Data Form (Coming soon)</div>;
      case 9:
        return <div>Bank Data Form (Coming soon)</div>;
      case 10:
        return <div>Review & Submit (Coming soon)</div>;
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
