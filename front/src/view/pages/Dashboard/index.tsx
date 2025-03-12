import { Modal } from "@/view/components/Modal";
import { ModalSearch } from "@/view/components/ModalSearch";
import { Spinner } from "@/view/components/Spinner";
import { Button } from "@/view/components/ui/button";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { PlusCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";

import { ItemJobCard } from "@/view/components/ItemJobCard";
import { useDashboardController } from "./useDashboardController";


export function Dashboard() {
  const {
    user,
    jobsPending,
    jobsApproving,
    jobsChanging,
    jobsApproved,
    isLoading,
    control,
    dateEndCut,
    dateStartCut,
    handleSubmit,
    openDashboardModal,
    closeDashboardModal,
    openModalDashboard
  } = useDashboardController();

  return (
    <>
      <div>
        <div className="flex mb-4 gap-2">
          <Button size="sm" className="h-9 gap-1" asChild>
            <Link to="/solicitacoes/novo">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Nova Solicitação
              </span>
            </Link>
          </Button>

          <Button size="sm" onClick={openDashboardModal}>
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Filtro
            </div>
          </Button>
        </div>

        <Modal open={openModalDashboard} onClose={closeDashboardModal}>
          <ModalSearch
            isLoading={isLoading}
            control={control}
            dateEndCut={dateEndCut}
            dateStartCut={dateStartCut}
            handleSubmit={handleSubmit}
          />
        </Modal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="font-bold text-xl mb-2">Nova Solicitação</h2>
            <ScrollArea className="h-[500px] w-full rounded-md border p-3 bg-white relative">
              {isLoading && (
                <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-white z-40">
                  <Spinner className="w-6 h-6 fill-primary" />
                </div>
              )}
              {jobsPending?.map((job) => {
                return (
                  <ItemJobCard
                    key={job.id}
                    id={job.id}
                    name={job.user.corporate_name}
                    dataCreated={new Date(job.created)}
                    formats={job.format}
                    reference={job.referencia}
                    user={user!.data}
                    comments={job.comments}
                  />
                )
              })}
            </ScrollArea>
          </div>

          <div>
            <h2 className="font-bold text-xl mb-2">Ajustes</h2>
            <ScrollArea className="h-[500px] w-full rounded-md border p-3 bg-white">
              {isLoading && (
                <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-white z-40">
                  <Spinner className="w-6 h-6 fill-primary" />
                </div>
              )}

              {jobsChanging?.map((job) => {
                return (
                  <ItemJobCard
                    key={job.id}
                    id={job.id}
                    name={job.user.corporate_name}
                    dataCreated={new Date(job.created)}
                    formats={job.format}
                    reference={job.referencia}
                    user={user!.data}
                    comments={job.comments}
                  />
                )
              })}
            </ScrollArea>
          </div>

          <div>
            <h2 className="font-bold text-xl mb-2">Aguardando Aprovação</h2>
            <ScrollArea className="h-[500px] w-full rounded-md border p-3 bg-white">
              {isLoading && (
                <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-white z-40">
                  <Spinner className="w-6 h-6 fill-primary" />
                </div>
              )}

              {jobsApproving?.map((job) => {
                return (
                  <ItemJobCard
                    key={job.id}
                    id={job.id}
                    name={job.user.corporate_name}
                    dataCreated={new Date(job.created)}
                    formats={job.format}
                    reference={job.referencia}
                    user={user!.data}
                    comments={job.comments}
                  />
                )
              })}
            </ScrollArea>
          </div>

          <div>
            <h2 className="font-bold text-xl mb-2">Aprovados</h2>
            <ScrollArea className="h-[500px] w-full rounded-md border p-3 bg-white">
              {isLoading && (
                <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-white z-40">
                  <Spinner className="w-6 h-6 fill-primary" />
                </div>
              )}

              {jobsApproved?.map((job) => {
                return (
                  <ItemJobCard
                    key={job.id}
                    id={job.id}
                    name={job.user.corporate_name}
                    dataCreated={new Date(job.created)}
                    formats={job.format}
                    reference={job.referencia}
                    user={user!.data}
                    comments={job.comments}
                  />
                )
              })}
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  )
}
