import { useContext } from "react";
import { StepperContext } from "../pages/Projects/components/Stepper";

export function useStepper() {
  return useContext(StepperContext)
}
