import { Modal2 } from "@/view/components/Modal2";
import { Spinner } from "@/view/components/Spinner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/view/components/ui/alert-dialog";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";
import { DialogClose, DialogFooter } from "@/view/components/ui/dialog";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";
import { Separator } from "@/view/components/ui/separator";
import { Edit, Loader2, PlusCircle, Trash2 } from "lucide-react";
import { useChecklistController } from "./useChecklistController";

export default function Checklists() {
  const { checklists, handleDeleteItem, handleSubmit, isPending, register, errors, onCloseModal, closeNewAccountModal, openNewAccountModal, handleSubmitUpdate, openEditAccountModal, closeEditAccountModal, onCloseEditModal, isPendingUpdate, isLoadingEdit, isLoading, isLoadingDelete } = useChecklistController()

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[900px] w-full flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Checklists Padrões
          </h1>
        </div>

        <Card x-chunk="dashboard-07-chunk-0" className="pt-6">
          <CardContent className="min-h-[200px] relative">

            <Button size="icon" className="h-9 mb-4" onClick={openNewAccountModal}>
              <PlusCircle className="h-5 w-5" />
            </Button>

            <Modal2
              open={onCloseModal}
              onOpenChange={closeNewAccountModal}
              title="Adicionar Novo"
              description="Cadastre um novo item padrão em checklist para seu projeto."
            >
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid items-center gap-2">
                    <Label htmlFor="name">
                      Nome
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      className="w-full"
                      {...register('name')}
                      error={errors?.name?.message}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancelar
                    </Button>
                  </DialogClose>

                  <Button disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Cadastrar
                  </Button>
                </DialogFooter>
              </form>
            </Modal2>

            <Modal2
              open={onCloseEditModal}
              onOpenChange={closeEditAccountModal}
              title="Editar Item"
              description="Edite o item do checklist para seu projeto."
            >
              <div className="relative">
                {isLoadingEdit && (
                  <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-white">
                    <Spinner className="w-6 h-6 fill-primary" />
                  </div>
                )}

                <form
                  onSubmit={handleSubmitUpdate}
                >
                  <div className="grid gap-4 py-4">
                    <div className="grid items-center gap-2">
                      <Label htmlFor="name">
                        Nome
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        className="w-full"
                        {...register('name')}
                        error={errors?.name?.message}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Cancelar
                      </Button>
                    </DialogClose>

                    <Button disabled={isPendingUpdate}>
                      {isPendingUpdate && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Atualizar
                    </Button>
                  </DialogFooter>
                </form>
              </div>
            </Modal2>

            {isLoadingDelete || isLoading && (
              <div className="w-full h-full flex justify-center items-center absolute top-0 left-0">
                <Spinner className="w-6 h-6 fill-primary" />
              </div>
            )}

            {checklists?.map((checklist) => (
              <div key={checklist.id} className="space-y-3">
                <div className="flex justify-between items-center mt-3">
                  <div>
                    <span className="text-sm">{checklist.name}</span>
                  </div>

                  <div className="flex gap-4 items-center">
                    <Button
                      className="p-0 bg-transparent text-[#020817] h-auto hover:bg-transparent cursor-pointer"
                      onClick={() => {
                        openEditAccountModal(checklist.id)
                      }}
                      asChild
                    >
                      <a>
                        <Edit className="w-4 h-4" />
                      </a>
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger><Trash2 className="w-4 h-4" /></AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Deseja realmente excluir?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Essa ação não pode ser desfeita. Isso excluirá permanentemente os dados de nossos servidores.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteItem(checklist.id)}>Confirmar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>

                <Separator />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
