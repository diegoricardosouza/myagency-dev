import { cn } from "@/lib/utils";
import { Spinner } from "@/view/components/Spinner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/view/components/ui/alert-dialog";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/view/components/ui/dialog";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { Check, Edit, Plus, Trash2 } from "lucide-react";
import { useChecklistShowProjectController } from "./useChecklistShowProjectController";

export function Checklist() {
  const {
    checklist,
    handleChecklistChange,
    isFetchingChecklist,
    isOpenModal,
    openModal,
    closeModal,
    register,
    handleSubmit,
    errors,
    isLoadingDelete,
    handleDeleteItem,
    isPending,
    isCloseEditModal,
    closeEditModal,
    openEditModal,
    handleSubmitUpdate
  } = useChecklistShowProjectController();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Checklist do Projeto</h2>
        <Button variant="outline" onClick={openModal}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Item
        </Button>
      </div>

      <Card className="relative overflow-hidden min-h-[175px]">
        {(isFetchingChecklist || isLoadingDelete || isPending) && (
          <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-white/80 z-10">
            <Spinner className="w-6 h-6 fill-primary" />
          </div>
        )}
        <CardContent className="pt-6">
          {!checklist || checklist.length === 0 ? (
            <div className="text-center text-muted-foreground">
              Nenhum item encontrado
            </div>
          ) : (
            <ul className="space-y-1">
              {checklist.map((item) => {
                return (
                  <li key={item.id} className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-5 w-5 shrink-0 items-center justify-center rounded-none border border-primary relative',
                        item.active && "bg-primary border-primary"
                      )}
                      onClick={() => handleChecklistChange(item.id, item.active, item.name)}
                      style={{ cursor: "pointer" }}
                    >
                      {item.active && <Check className="h-3 w-3 text-primary-foreground" />}
                    </div>
                    <span className={item.active ? "line-through text-muted-foreground" : ""}>{item.name}</span>

                    <div className="ml-auto flex gap-0 items-center">
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button
                            className="bg-transparent text-[#020817] cursor-pointer"
                            variant="ghost"
                            asChild
                            size="icon"
                          >
                            <a>
                              <Trash2 className="w-4 h-4" />
                            </a>
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Deseja realmente excluir?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Essa ação não pode ser desfeita. Isso excluirá permanentemente os dados de nossos servidores.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteItem(item.id)}>Confirmar</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <Button
                        className="bg-transparent text-[#020817] cursor-pointer"
                        variant="ghost"
                        asChild
                        size="icon"
                        onClick={() => {
                          openEditModal(item.id)
                        }}
                      >
                        <a>
                          <Edit className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>

      <Dialog open={isOpenModal} onOpenChange={closeModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Checklist</DialogTitle>
            <DialogDescription>
              Adicione um novo checklist ao projeto. Esta opção está disponível apenas para gestores.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
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
              <Button>Adicionar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isCloseEditModal} onOpenChange={closeEditModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Checklist</DialogTitle>
            <DialogDescription>
              Adicione um novo checklist ao projeto. Esta opção está disponível apenas para gestores.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitUpdate}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
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
              <Button>Atualizar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
