import { cn } from "@/lib/utils";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";
import { useStepper } from "@/view/hooks/use-stepper";
import React, { createContext, useCallback, useState } from "react";

interface StepperContextValue {
  previousStep: () => void;
  nextStep: () => void;
}

export const StepperContext = createContext({} as StepperContextValue);

interface StepperProps {
  initialStep?: number;
  steps: {
    label: string;
    content: React.ReactNode;
  }[]
}

export function Stepper({ steps, initialStep = 0 }: StepperProps) {
  const [currentStep, setCurrentStep] = useState(initialStep)

  const previousStep = useCallback(() => {
    setCurrentStep(prevState => Math.max(0, prevState - 1));
  }, [])

  const nextStep = useCallback(() => {
    setCurrentStep(prevState => (
      Math.min(steps.length - 1, prevState + 1)
    ));
  }, [steps])

  return (
    <StepperContext.Provider value={{ previousStep, nextStep }}>
      <div>
        <ul className="space-x-6">
          {steps.map((step, index) => (
            <li key={step.label} className={cn(
              'inline-block text-[13px] px-2 py-[6px] rounded-md',
              index === currentStep && 'bg-primary text-primary-foreground'
            )}>
              {String(index + 1).padStart(2, '0')}. {step.label}
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <Card>
            <CardContent className="pt-6">
              {steps[currentStep].content}
            </CardContent>
          </Card>
        </div>
      </div>
    </StepperContext.Provider>
  )
}

export function StepperHeader({ title, description }: { title: string; description: string; }) {
  return (
    <header>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <span className="text-muted-foreground text-sm">{description}</span>
    </header>
  )
}

export function StepperFooter({ children }: { children: React.ReactNode }) {
  return (
    <footer className="mt-10 flex justify-end gap-4">
      {children}
    </footer>
  )
}

export function StepperPreviousButton({
  size = 'sm',
  type = 'button',
  variant = 'outline',
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
  const { previousStep } = useStepper()

  return (
    <Button
      variant={variant}
      size={size}
      type={type}
      onClick={onClick ?? previousStep}
      {...props}
    >
      Anterior
    </Button>
  )
}

export function StepperNextButton({
  size = 'sm',
  type = 'button',
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
  const { nextStep } = useStepper()

  return (
    <Button
      size={size}
      type={type}
      onClick={onClick ?? nextStep}
      {...props}
    >
      Próximo
    </Button>
  )
}
