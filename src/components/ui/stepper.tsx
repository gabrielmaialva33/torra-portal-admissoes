import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  onStepClick?: (step: number) => void;
  orientation?: "horizontal" | "vertical";
}

export function Stepper({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
  orientation = "horizontal",
}: StepperProps) {
  const isStepComplete = (stepId: number) => completedSteps.includes(stepId);
  const isStepCurrent = (stepId: number) => currentStep === stepId;
  const canAccessStep = (stepId: number) => {
    if (stepId === 1) return true;
    return completedSteps.includes(stepId - 1);
  };

  return (
    <div
      className={cn(
        "flex",
        orientation === "horizontal" ? "flex-row" : "flex-col"
      )}
    >
      {steps.map((step, index) => {
        const isComplete = isStepComplete(step.id);
        const isCurrent = isStepCurrent(step.id);
        const canAccess = canAccessStep(step.id);
        const isLast = index === steps.length - 1;

        return (
          <div
            key={step.id}
            className={cn(
              "flex items-center",
              orientation === "horizontal" ? "flex-1" : "w-full"
            )}
          >
            <button
              onClick={() => canAccess && onStepClick?.(step.id)}
              disabled={!canAccess}
              className={cn(
                "relative flex items-center",
                canAccess ? "cursor-pointer" : "cursor-not-allowed"
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                  isComplete
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCurrent
                    ? "border-primary bg-background text-primary"
                    : canAccess
                    ? "border-muted-foreground bg-background text-muted-foreground"
                    : "border-muted bg-muted text-muted-foreground"
                )}
              >
                {isComplete ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>

              <div
                className={cn(
                  "ml-3",
                  orientation === "horizontal" ? "hidden sm:block" : ""
                )}
              >
                <p
                  className={cn(
                    "text-sm font-medium",
                    isCurrent
                      ? "text-foreground"
                      : canAccess
                      ? "text-muted-foreground"
                      : "text-muted-foreground/50"
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground">
                    {step.description}
                  </p>
                )}
              </div>
            </button>

            {!isLast && (
              <div
                className={cn(
                  "flex-1",
                  orientation === "horizontal"
                    ? "mx-4 h-0.5"
                    : "mx-auto my-2 w-0.5 h-8"
                )}
              >
                <div
                  className={cn(
                    "h-full w-full transition-all",
                    isComplete ? "bg-primary" : "bg-muted"
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}