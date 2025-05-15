import { User } from "@/app/entities/User";
import { InputMask } from "@/view/components/InputMask";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/view/components/ui/select";
import { useStepper } from "@/view/hooks/use-stepper";
import { Controller, useFormContext } from "react-hook-form";
import { FormData } from "../../NewProject/useNewProjectController";
import { StepperFooter, StepperHeader, StepperNextButton } from "../Stepper";


interface AboutStepProps {
  users?: User[]
}

export function AboutStep({ users }: AboutStepProps) {
  const { nextStep } = useStepper();
  const form = useFormContext<FormData>()

  async function handleNextStep() {
    const isValid = await form.trigger([
      'user_id',
      'type',
      'name',
      'phone',
      'email',
      'project_name',
    ]);

    if(isValid) {
      nextStep();
    }
  }

  return (
    <div className="mt-2">
      <StepperHeader
        title="Sobre o Projeto"
        description="Forneça informações sobre o projeto"
      />

      <div className="mt-8 flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="client">Cliente</Label>
          <Controller
            control={form.control}
            name="user_id"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                onValueChange={onChange}
                value={value}
              >
                <SelectTrigger
                  id="user_id"
                  aria-label="Selecione..."
                >
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {users?.map((user) => (
                    <SelectItem key={user.id} value={user.id}>{user.fantasy_name}</SelectItem>
                  ))}
                </SelectContent>

                {form.formState.errors?.user_id?.message && (
                  <div className="flex gap-2 items-center text-red-700">
                    <span className="text-xs">{form.formState.errors?.user_id?.message}</span>
                  </div>
                )}
              </Select>
            )}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="project_name">Nome do Projeto</Label>
          <Input
            id="project_name"
            type="text"
            className="w-full"
            {...form.register('project_name')}
            error={form.formState.errors?.project_name?.message}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="nivel">Tipo do Projeto</Label>
          <Controller
            control={form.control}
            name="type"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                onValueChange={onChange}
                value={value}
              >
                <SelectTrigger
                  id="type"
                  aria-label="Selecione..."
                >
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Site Template">Site Template</SelectItem>
                  <SelectItem value="Site Personalizado">Site Personalizado</SelectItem>
                  <SelectItem value="Landing Page">Landing Page</SelectItem>
                  <SelectItem value="Sistema">Sistema</SelectItem>
                </SelectContent>

                {form.formState.errors?.type?.message && (
                  <div className="flex gap-2 items-center text-red-700">
                    <span className="text-xs">{form.formState.errors?.type?.message}</span>
                  </div>
                )}
              </Select>
            )}
          />
        </div>

        <div className="mt-4">
          <h4 className="text-lg font-semibold tracking-tight mb-2">
            Responsável pelo desenvolvimento:
          </h4>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                className="w-full"
                {...form.register('name')}
                error={form.formState.errors?.name?.message}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">WhatsApp</Label>
              <Controller
                control={form.control}
                name="phone"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <InputMask
                    mask="(__) _____-____"
                    value={value}
                    onChange={onChange}
                    error={form.formState.errors?.phone?.message}
                  />
                )}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="text"
                className="w-full"
                {...form.register('email')}
                error={form.formState.errors?.email?.message}
              />
            </div>
          </div>
        </div>
      </div>

      <StepperFooter>
        <StepperNextButton onClick={handleNextStep} />
      </StepperFooter>
    </div>
  )
}
