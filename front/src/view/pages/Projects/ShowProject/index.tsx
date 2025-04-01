
import {
  Loader2,
  Plus,
  Shield
} from "lucide-react"

import { Spinner } from "@/view/components/Spinner"
import { Button } from "@/view/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/view/components/ui/tabs"
import { Checklist } from "./components/Checklist"
import { ModalAddPage } from "./components/ModalAddPage"
import { ModalEditPage } from "./components/ModalEditPage"
import { ModalProjectDetails } from "./components/ModalProjectDetails"
import { PageCard } from "./components/PageCard"
import { ProjectDetails } from "./components/ProjectDetails"
import { ProjectProgress } from "./components/ProjectProgress"
import { TechnicalInformation } from "./components/TechnicalInformation"
import { TemporaryLink } from "./components/TemporaryLink"
import { useShowProjectController } from "./useShowProjectController"

export default function ShowProject() {
  const {
    handleSubmitPage,
    register,
    onCloseModalPage,
    handleDeletePage,
    handleChangingStatusPage,
    handleDesapprovedPageStatusPage,
    handleInProgressStatusPage,
    handleReviewStatusPage,
    openPageDetails,
    closePageDetails,
    handleEditPage,
    closePageEdit,
    openPageEdit,
    removeFile,
    onOpenModalPage,
    handleSendMailfinance,
    handleSendMailFinished,
    isLoadingEditPage,
    project,
    isAddPageOpen,
    user,
    errors,
    control,
    isPendingJob,
    jobs,
    isLoadingJob,
    isLoadingDeleteJob,
    isChangeStatusPage,
    isChecklistComplete,
    areAllPagesApproved,
    isDetailsOpen,
    pageDetailOpen,
    pageEditOpen,
    isDeleteFilePage,
    isPendingMailFinance,
    isPendingMailFinished
  } = useShowProjectController();

  return (
    <div className="p-0 lg:p-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{project?.project_name}</h1>
          <p className="text-muted-foreground">Cliente: {project?.user.corporate_name}</p>
        </div>
      </header>

      <ProjectDetails
        temporaryLink={project?.temporary_link}
        description={project?.observations}
        pages={jobs}
        typeProject={project?.type}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2 order-2 lg:order-1">
          <Tabs defaultValue="pages">
            <TabsList className="mb-4">
              <TabsTrigger value="pages">Páginas</TabsTrigger>
              {user?.data.level === 'ADMIN' && (
                <TabsTrigger value="checklist">Checklist</TabsTrigger>
              )}
            </TabsList>

            {/* Aba de Páginas */}
            <TabsContent value="pages">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Páginas do Projeto</h2>
                {user?.data.level === "ADMIN" && (
                  <>
                    <Button type="button" onClick={onOpenModalPage}>
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Página
                    </Button>
                    <ModalAddPage
                      open={isAddPageOpen}
                      onOpenChange={onCloseModalPage}
                      register={register}
                      control={control}
                      errors={errors}
                      handleSubmit={handleSubmitPage}
                      isLoading={isPendingJob}
                    />
                  </>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 relative min-h-[256px]">
                {(isPendingJob || isLoadingJob || isLoadingDeleteJob) && (
                  <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-white/80 z-10">
                    <Spinner className="w-6 h-6 fill-primary" />
                  </div>
                )}

                {jobs?.map((page) => (
                  <PageCard
                    key={page.id}
                    user={user!}
                    page={page}
                    disabled={isLoadingDeleteJob || isChangeStatusPage}
                    deleteItem={handleDeletePage}
                    approvedPage={handleChangingStatusPage}
                    desapprovedPage={handleDesapprovedPageStatusPage}
                    inProgressPage={handleInProgressStatusPage}
                    reviewPage={handleReviewStatusPage}
                    openModalDetails={() => openPageDetails(page.id)}
                    openModalEditPage={() => openPageEdit(page.id)}
                  />
                ))}
              </div>
            </TabsContent>

            {user?.data.level === 'ADMIN' && (
              <TabsContent value="checklist">
                <Checklist />
              </TabsContent>
            )}
          </Tabs>
        </div>

        <div className="flex flex-col gap-4 order-1 lg:order-2">
          <ProjectProgress
            closeDate={project?.closing_date}
            numberDays={project?.calendar_days}
            pages={jobs}
          />

          <TemporaryLink
            temporaryLink={project?.temporary_link}
            user={user}
            finished={project?.finished}
          />

          <TechnicalInformation
            user={user}
            technicalInfo={project?.technical_information}
          />
        </div>
      </div>

      <footer className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Você está visualizando como {user?.data.level === 'ADMIN' ? 'Gestor' : 'Cliente'}.
          </span>
        </div>

        {user?.data.level === "ADMIN" && (
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              disabled={!isChecklistComplete || !areAllPagesApproved || isPendingMailFinance}
              className="bg-yellow-400 hover:bg-yellow-500"
              onClick={handleSendMailfinance}
            >
              {isPendingMailFinance && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Site Concluído, Solicitar Análise Financeira
            </Button>

            <Button
              disabled={!isChecklistComplete || !areAllPagesApproved || isPendingMailFinished}
              className="bg-green-600 hover:bg-green-700"
              onClick={handleSendMailFinished}
            >
              {isPendingMailFinished && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enviar e-mail conclusão
            </Button>
          </div>
        )}
      </footer>

      {/* Modal de detalhes da página */}
      <ModalProjectDetails
        page={pageDetailOpen}
        open={isDetailsOpen}
        onOpenChange={closePageDetails}
        userLevel={user?.data.level}
        approvedPage={handleChangingStatusPage}
        isLoading={isLoadingEditPage}
      />

      {/* Modal de edição da página */}
      <ModalEditPage
        control={control}
        errors={errors}
        handleSubmit={handleEditPage}
        register={register}
        open={pageEditOpen}
        onOpenChange={closePageEdit}
        isLoading={isLoadingEditPage}
        files={pageDetailOpen?.files}
        removeEditFile={removeFile}
        isLoadingDeleteFile={isDeleteFilePage}
      />
    </div>
  )
}

