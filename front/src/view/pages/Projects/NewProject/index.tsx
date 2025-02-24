import { Button } from "@/view/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import { Stepper } from "../components/Stepper";
import { AboutStep } from "../components/steps/AboutStep";
import { ChecklistStep } from "../components/steps/ChecklistStep";
import { FinanceStep } from "../components/steps/FinanceStep";
import { PageStep } from "../components/steps/PageStep";
import { PlanStep } from "../components/steps/PlanStep";
import { useNewProjectController } from "./useNewProjectController";

export function NewProject() {
  const { handleFormSubmit, fields, handleRemovePage, form, users, plans, fieldsChecklist, handleRemoveChecklist, handleAddChecklist } = useNewProjectController();

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
                  content: <AboutStep users={users?.data} />
                },
                {
                  label: "Páginas",
                  content: <PageStep fields={fields} handleRemovePage={handleRemovePage} />
                },
                {
                  label: "Checklist",
                  content: <ChecklistStep
                              fieldsChecklists={fieldsChecklist}
                              removeChecklist={handleRemoveChecklist}
                              addChecklist={handleAddChecklist}
                            />
                },
                {
                  label: "Financeiro",
                  content: <FinanceStep />
                },
                {
                  label: "Plano e Prazos",
                  content: <PlanStep plans={plans?.data} />
                }
              ]}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
