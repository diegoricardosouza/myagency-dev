import { Button } from "@/view/components/ui/button";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";
import { useStepper } from "@/view/hooks/use-stepper";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Trash2 } from "lucide-react";
import { Controller, FieldArrayWithId, useFormContext } from "react-hook-form";
import { FormData } from "../../NewProject/useNewProjectController";
import { StepperFooter, StepperHeader, StepperNextButton, StepperPreviousButton } from "../Stepper";

interface PageStepProps {
  fields: FieldArrayWithId<FormData>[];
  handleRemovePage: (index: number) => void;
}

export function PageStep({ fields, handleRemovePage }: PageStepProps) {
  const { nextStep } = useStepper();
  const form = useFormContext<FormData>()

  async function handleNextStep() {
    const isValid = await form.trigger([
      'number_pages',
      'pages',
      'observations',
    ]);

    if(isValid) {
      nextStep();
    }
  }

  return (
    <div className="mt-2">
      <StepperHeader
        title="Páginas"
        description="Forneça as páginas do projeto"
      />

      <div className="mt-8">
        <div className="flex flex-col gap-4">
          <div className="grid gap-2 col-span-2">
            <Label htmlFor="number_pages">Quantas paginas esse projeto terá?</Label>
            <Input
              id="number_pages"
              type="number"
              className="w-full"
              {...form.register('number_pages')}
              error={form.formState.errors?.number_pages?.message}
              min="1"
              defaultValue='1'
            />
          </div>

          <div className="grid gap-3 col-span-2">
            <Label>Quais as paginas contratadas?</Label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <div className="flex-1">
                  <div className="grid gap-2">
                    <Input
                      id="pages"
                      type="text"
                      className="w-full"
                      {...form.register(`pages.${index}.name`)}
                      error={form.formState.errors?.pages?.[index]?.name?.message}
                    />
                  </div>
                </div>

                <Button onClick={() => handleRemovePage(index)} className="bg-transparent hover:bg-gray-50">
                  <Trash2 className="text-red-600 w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>

          <div className="grid gap-2">
            <Label>Observações sobre o projeto</Label>
            <Controller
              control={form.control}
              name="observations"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <CKEditor
                  editor={ClassicEditor}
                  data={value}
                  config={{
                    language: 'pt-br'
                  }}
                  onChange={(_event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                  }}
                />
              )}
            />
            {form.formState.errors?.observations?.message && (
              <div className="flex gap-2 mt-2 items-center text-red-700">
                <span className="text-xs">{form.formState.errors?.observations?.message}</span>
              </div>
            )}
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
