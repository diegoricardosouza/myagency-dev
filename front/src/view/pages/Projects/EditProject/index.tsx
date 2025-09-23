import { Button } from "@/view/components/ui/button";
import { ChevronLeft, PlusCircle } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import { Stepper } from "../components/Stepper";
import { AboutStep } from "../components/steps/AboutStep";
import { ChecklistStep } from "../components/steps/ChecklistStep";
import { FinanceStep } from "../components/steps/FinanceStep";
import { PageStep } from "../components/steps/PageStep";
import { PlanStep } from "../components/steps/PlanStep";
import { useEditProjectController } from "./useEditProjectController";

export function EditProject() {
  const {
    users,
    form,
    plans,
    fields,
    fieldsChecklist,
    handleFormSubmit,
    handleRemoveChecklist,
    handleRemovePage,
    handleAddChecklist,
    linkProof,
    nameProof,
    handleValueClient
  } = useEditProjectController();

  return (
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[900px] w-full flex-1 auto-rows-max gap-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link to="/projetos">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Link>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Editar Projeto
              </h1>
            </div>

            <div>
              <Button size="sm" className="h-8 gap-1" asChild>
                <Link to="/projetos/novo">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Novo Projeto
                  </span>
                </Link>
              </Button>
            </div>
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
                    content: <AboutStep users={users?.data} handleValueClient={handleValueClient} />
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
                    content: <FinanceStep linkProof={linkProof} nameProof={nameProof} />
                  },
                  {
                    label: "Plano e Prazos",
                    content: <PlanStep plans={plans?.data} labelButton="Atualizar" />
                  }
                ]}
              />
            </form>
          </FormProvider>
        </div>
      </div>
    )
}
