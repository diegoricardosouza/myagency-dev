import { Button } from "@/view/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import { Stepper } from "../components/Stepper";
import { Step1 } from "../components/stepsNew/Step1";
import { Step2 } from "../components/stepsNew/Step2";
import { Step3 } from "../components/stepsNew/Step3";
import { Step4 } from "../components/stepsNew/Step4";
import { useNewProjectController } from "./useNewProjectController";

export function NewProject() {
  const { handleFormSubmit, fields, handleRemovePage, form, users, plans } = useNewProjectController();

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[900px] w-full flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" className="h-7 w-7" asChild>
            <Link to="/projetos">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Adicionar Novo Projeto
          </h1>
        </div>

        <FormProvider {...form}>
          <form
            encType="multipart/form-data"
            onSubmit={handleFormSubmit}
          >
            <Stepper
              steps={[
                {
                  label: "Sobre o projeto",
                  content: <Step1 users={users?.data} />
                },
                {
                  label: "Páginas",
                  content: <Step2 fields={fields} handleRemovePage={handleRemovePage} />
                },
                {
                  label: "Financeiro",
                  content: <Step3 />
                },
                {
                  label: "Plano e Prazos",
                  content: <Step4 plans={plans?.data} />
                }
              ]}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
