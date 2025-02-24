import { Button } from "@/view/components/ui/button";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";
import { useStepper } from "@/view/hooks/use-stepper";
import { CirclePlus, Trash2 } from "lucide-react";
import { FieldArrayWithId, useFormContext } from "react-hook-form";
import { FormData } from "../../NewProject/useNewProjectController";
import { StepperFooter, StepperHeader, StepperNextButton, StepperPreviousButton } from "../Stepper";


interface ChecklistStepProps {
  fieldsChecklists: FieldArrayWithId<FormData>[];
  removeChecklist: (index: number) => void;
  addChecklist: () => void;
}

export function ChecklistStep({ fieldsChecklists, removeChecklist, addChecklist }: ChecklistStepProps) {
  const { nextStep } = useStepper();
  const form = useFormContext<FormData>()

  async function handleNextStep() {
    const isValid = await form.trigger(
      'checklists', { shouldFocus: true }
    );

    if(isValid) {
      nextStep();
    }
  }

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center">
        <StepperHeader
          title="Checklists"
          description="Checklists padrões do projeto"
        />

        <Button
          onClick={addChecklist}
          type="button"
        >
          <CirclePlus />
        </Button>
      </div>

      <div className="mt-8">
        <div className="flex flex-col gap-4">
          <div className="grid gap-3 col-span-2">
            <Label>Checklists</Label>
            {fieldsChecklists?.map((checklist, index) => (
              <div key={checklist.id} className="flex gap-2">
                <div className="flex-1">
                  <div className="grid gap-2">
                    <Input
                      id="checklists"
                      type="text"
                      className="w-full"
                      defaultValue={checklist.name}
                      {...form.register(`checklists.${index}.name`)}
                      error={form.formState.errors?.checklists?.[index]?.name?.message}
                    />
                  </div>
                </div>

                <Button onClick={() => removeChecklist(index)} className="bg-red-600 hover:bg-red-400">
                  <Trash2 className="text-white w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <StepperFooter>
        <StepperPreviousButton />
        <StepperNextButton onClick={handleNextStep} />
      </StepperFooter>
    </div>
  )
}
