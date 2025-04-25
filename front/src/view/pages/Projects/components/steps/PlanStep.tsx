import { Plan } from "@/app/entities/Plan";
import { DataPicker } from "@/view/components/DataPicker";
import { Button } from "@/view/components/ui/button";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/view/components/ui/select";
import { Loader2 } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { FormData } from "../../NewProject/useNewProjectController";
import { StepperFooter, StepperHeader, StepperPreviousButton } from "../Stepper";

interface PlanStepProps {
  plans?: Plan[];
  labelButton?: string;
  isSubmit?: boolean;
}

export function PlanStep({ plans, labelButton = 'Cadastrar', isSubmit }: PlanStepProps) {
  const form = useFormContext<FormData>()
  const dateNow = new Date();
  const startDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());

  return (
    <div className="mt-2">
      <StepperHeader
        title="Plano e Prazos"
        description="Informe o plano e o prazo do projeto"
      />

      <div className="mt-8 flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="plan_id">Plano Mensal</Label>
          <Controller
            control={form.control}
            name="plan_id"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                onValueChange={onChange}
                value={value}
              >
                <SelectTrigger
                  id="plan_id"
                  aria-label="Selecione..."
                >
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {plans?.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>{plan.name}</SelectItem>
                  ))}
                </SelectContent>

                {form.formState.errors?.plan_id?.message && (
                  <div className="flex gap-2 items-center text-red-700">
                    <span className="text-xs">{form.formState.errors?.plan_id?.message}</span>
                  </div>
                )}
              </Select>
            )}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="signed_contract">Contrato Assinado?</Label>
          <Controller
            control={form.control}
            name="signed_contract"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                onValueChange={onChange}
                value={value}
              >
                <SelectTrigger
                  id="signed_contract"
                  aria-label="Selecione..."
                >
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sim">Sim</SelectItem>
                  <SelectItem value="Não">Não</SelectItem>
                  <SelectItem value="Aguardando">Aguardando</SelectItem>
                </SelectContent>

                {form.formState.errors?.signed_contract?.message && (
                  <div className="flex gap-2 items-center text-red-700">
                    <span className="text-xs">{form.formState.errors?.signed_contract?.message}</span>
                  </div>
                )}
              </Select>
            )}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="outsource">Terceirizar?</Label>
          <Input
            id="outsource"
            type="text"
            className="w-full"
            {...form.register('outsource')}
            error={form.formState.errors?.outsource?.message}
          />
        </div>

        <div className="grid">
          <Controller
            control={form.control}
            name="closing_date"
            defaultValue={new Date(startDate!)}
            render={({ field: { onChange, value } }) => (
              <DataPicker
                label="Data Fechamento"
                value={value}
                onChange={onChange}
                classNameText="!text-black"
              />
            )}
          />
        </div>

        <div className="grid gap-2 col-span-2">
          <Label htmlFor="number_pages">Dias Corridos</Label>
          <Input
            id="calendar_days"
            type="number"
            className="w-full"
            {...form.register('calendar_days')}
            error={form.formState.errors?.calendar_days?.message}
            min="1"
            defaultValue="1"
          />
        </div>
      </div>

      <StepperFooter>
        <StepperPreviousButton />
        <Button type="submit" size="sm" disabled={isSubmit}>
          {isSubmit && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {labelButton}
        </Button>
      </StepperFooter>
    </div>
  )
}
