import { Button } from "@/view/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/view/components/ui/dialog";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";
import { Textarea } from "@/view/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData } from "../../useShowProjectController";
import { UploadFiles } from "../UploadFiles";

interface ModalAddPageProps {
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  register: UseFormRegister<FormData>;
  open: boolean;
  onOpenChange(): void;
  isLoading?: boolean;
}

export function ModalAddPage({ control, errors, register, handleSubmit, open, onOpenChange, isLoading }: ModalAddPageProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Página</DialogTitle>
          <DialogDescription>
            Adicione uma nova página ao projeto. Esta opção está disponível apenas para gestores.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título da Página</Label>
              <Input
                id="title"
                placeholder="Ex: Galeria de Fotos"
                {...register('name')}
                error={errors?.name?.message}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descreva o conteúdo e funcionalidades da página"
                {...register('description')}
              />
              {errors?.description?.message && (
                <div className="flex gap-2 mt-0 items-center text-red-700">
                  <span className="text-xs">{errors?.description?.message}</span>
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Arquivos</Label>
              <Controller
                control={control}
                name="files"
                defaultValue={null}
                render={({ field: { onChange } }) => (
                  <UploadFiles
                    onChange={onChange}
                  />
                )}
              />

              {errors?.files?.message && (
                <div className="flex gap-2 items-center text-red-700">
                  <span className="text-xs">{errors?.files?.message}</span>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={onOpenChange}
              type="button"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Adicionar Página
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
