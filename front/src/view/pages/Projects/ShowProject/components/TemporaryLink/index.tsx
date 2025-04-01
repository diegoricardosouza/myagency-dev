import { UserMe } from "@/app/contexts/AuthContext";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/view/components/ui/dialog";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";
import { Clock, Edit, ExternalLink, Link2, Loader2 } from "lucide-react";
import Countdown from "react-countdown";
import { useTemporaryLinkController } from "./useTemporaryLinkController";

interface TemporaryLinkProps {
  temporaryLink?: string;
  user: UserMe | undefined;
  finished?: boolean;
}

type RendererProp = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

export function TemporaryLink({ temporaryLink, user, finished }: TemporaryLinkProps) {
  const {
    closeModal,
    openModal,
    isPending,
    handleSubmit,
    openModalTech,
    errors,
    register,
    startDateIni,
    endDate
  } = useTemporaryLinkController()
  const projectFinished = !!finished;


  const renderer = ({ days, hours, minutes, seconds, completed }: RendererProp) => {
    return (
      <>
        {(!completed && !projectFinished) && (
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Tempo Restante
            </h3>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-muted p-2 rounded-md">
                <p className="text-xl font-bold">{days}</p>
                <p className="text-xs text-muted-foreground">Dias</p>
              </div>
              <div className="bg-muted p-2 rounded-md">
                <p className="text-xl font-bold">{hours}</p>
                <p className="text-xs text-muted-foreground">Horas</p>
              </div>
              <div className="bg-muted p-2 rounded-md">
                <p className="text-xl font-bold">{minutes}</p>
                <p className="text-xs text-muted-foreground">Min</p>
              </div>
              <div className="bg-muted p-2 rounded-md">
                <p className="text-xl font-bold">{seconds}</p>
                <p className="text-xs text-muted-foreground">Seg</p>
              </div>
            </div>
          </div>
        )}

        {projectFinished && (
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Tempo Restante
            </h3>

            <div className="font-mono text-green-500 text-lg font-semibold">
              Concluído
            </div>
          </div>
        )}

        {(completed && !projectFinished) && (
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Tempo Restante
            </h3>
            <div className="font-mono text-red-500 text-lg font-semibold">
              Expirado
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium flex items-center">
                  <Link2 className="h-4 w-4 mr-1" />
                  Link Temporário
                </h3>
                {user?.data.level === "ADMIN" && (
                  <Button size="sm" onClick={openModal} className="flex gap-2">
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Input value={temporaryLink || ""} readOnly className="text-xs read-only:bg-white" />
                <Button size="icon" variant="ghost" onClick={() => window.open(temporaryLink, "_blank")}>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {startDateIni && (
              <Countdown key={startDateIni} renderer={renderer} date={endDate} />
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={openModalTech} onOpenChange={closeModal} modal>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Informações Técnicas</DialogTitle>
            <DialogDescription>
              Edite as informações técnicas do projeto. Esta opção está disponível apenas para gestores.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="description">Link Temporário</Label>
                <Input
                  id="title"
                  placeholder="Link Temporário"
                  {...register('temporaryLink')}
                  error={errors?.temporaryLink?.message}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={closeModal}
                type="button"
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Atualizar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
