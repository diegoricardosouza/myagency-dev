import { formatBytes } from "@/lib/utils";
import { Spinner } from "@/view/components/Spinner";
import { Button } from "@/view/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/view/components/ui/dialog";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";
import { Textarea } from "@/view/components/ui/textarea";
import { Loader2, Paperclip, X } from "lucide-react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData, ProjectFile } from "../../useShowProjectController";
import { UploadFiles } from "../UploadFiles";

interface ModalEditPageProps {
  open: boolean;
  onOpenChange(): void;
  removeEditFile(id: string): void;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  control: Control<FormData>;
  isLoading?: boolean;
  errors: FieldErrors<FormData>;
  register: UseFormRegister<FormData>;
  files?: ProjectFile[];
  isLoadingDeleteFile?: boolean;
}

export function ModalEditPage({
    open,
    onOpenChange,
    handleSubmit,
    control,
    isLoading,
    errors,
    register,
    files,
    removeEditFile,
    isLoadingDeleteFile
  }: ModalEditPageProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="max-w-2xl overflow-hidden min-h-[600px]">
        {isLoading && (
          <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-white z-10">
            <Spinner className="w-6 h-6 fill-primary" />
          </div>
        )}

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

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Arquivos ({files?.length})</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2 scroll-selected-files relative">
                  {isLoadingDeleteFile && (
                    <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-white z-10">
                      <Spinner className="w-6 h-6 fill-primary" />
                    </div>
                  )}

                  {files?.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                      <div className="flex items-center">
                        <Paperclip className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium truncate max-w-[200px] lg:max-w-[100%]">{file.name.replace("jobs/", "")}</p>
                          <p className="text-xs text-muted-foreground">{file.size && formatBytes(Number(file?.size), 0)}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeEditFile(file.id!)
                        }}
                        type="button"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

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
              Atualizar Página
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
