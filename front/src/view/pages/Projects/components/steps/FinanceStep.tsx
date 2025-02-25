import { InputCurrencyMask } from "@/view/components/InputCurrencyMask";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/view/components/ui/select";
import { useStepper } from "@/view/hooks/use-stepper";
import { Controller, useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { FormData } from "../../NewProject/useNewProjectController";
import { StepperFooter, StepperHeader, StepperNextButton, StepperPreviousButton } from "../Stepper";

interface FinanceStepProps {
  linkProof?: string;
  nameProof?: string;
}

export function FinanceStep({ linkProof, nameProof }: FinanceStepProps) {
  const { nextStep } = useStepper();
  const form = useFormContext<FormData>()

  async function handleNextStep() {
    const isValid = await form.trigger([
      'value_project',
      'payment_method',
      'other',
      'entry_payment',
      'installment',
      'proof',
    ]);

    if(isValid) {
      nextStep();
    }
  }

  return (
    <div className="mt-2">
      <StepperHeader
        title="Financeiro"
        description="Informe os valores do projeto"
      />

      <div className="mt-8 flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="value_project">Valor do Projeto</Label>
          <Controller
            control={form.control}
            name="value_project"
            defaultValue=""
            render={({ field: { onChange, value } }) => {
              return (
                <InputCurrencyMask
                  value={value}
                  onChange={onChange}
                  error={form.formState.errors.value_project?.message}
                />
              )
            }}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="nivel">Forma de Pagamento</Label>
          <Controller
            control={form.control}
            name="payment_method"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                onValueChange={onChange}
                value={value}
              >
                <SelectTrigger
                  id="payment_method"
                  aria-label="Forma de Pagamento"
                >
                  <SelectValue placeholder="Forma de Pagamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="À Vista">À Vista</SelectItem>
                  <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
                  <SelectItem value="Pix">Pix</SelectItem>
                  <SelectItem value="Boleto">Boleto</SelectItem>
                </SelectContent>

                {form.formState.errors?.payment_method?.message && (
                  <div className="flex gap-2 items-center text-red-700">
                    <span className="text-xs">{form.formState.errors?.payment_method?.message}</span>
                  </div>
                )}
              </Select>
            )}
          />
        </div>

        <div className="grid gap-2 col-span-2">
          <Label htmlFor="installment">Parcelamento</Label>
          <Input
            id="installment"
            type="number"
            className="w-full"
            {...form.register('installment')}
            error={form.formState.errors?.installment?.message}
            min="0"
          />
        </div>

        <div className="grid gap-2 col-span-2">
          <Label htmlFor="other">Outra</Label>
          <Input
            id="other"
            className="w-full"
            {...form.register('other')}
            error={form.formState.errors?.other?.message}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="entry_payment">Entrada</Label>
          <Controller
            control={form.control}
            name="entry_payment"
            defaultValue=""
            render={({ field: { onChange, value } }) => {
              return (
                <InputCurrencyMask
                  value={value ?? ""}
                  onChange={onChange}
                  error={form.formState.errors.entry_payment?.message}
                />
              )
            }}
          />
        </div>

        <div className="grid gap-2 col-span-2">
          <Label htmlFor="proof">Anexar Comprovante</Label>
          {linkProof && (
            <Link to={linkProof} target="_blank" className="text-muted-foreground">
              <small>{nameProof}</small>
            </Link>
          )}
          <Input
            id="proof"
            className="w-full"
            type="file"
            {...form.register('proof')}
            error={form.formState.errors?.proof?.message}
          />
        </div>
      </div>

      <StepperFooter>
        <StepperPreviousButton />
        <StepperNextButton onClick={handleNextStep} />
      </StepperFooter>
    </div>
  )
}
