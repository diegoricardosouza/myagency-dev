import { UserMe } from "@/app/contexts/AuthContext";
import { Jobs } from "@/app/entities/Jobs";
import { getCardColorClass, getStatusText, getTextBadgeColorClass } from "@/lib/utils";
import { Spinner } from "@/view/components/Spinner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/view/components/ui/alert-dialog";
import { Badge } from "@/view/components/ui/badge";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/view/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/view/components/ui/tooltip";
import { format } from "date-fns";
import { Edit, FileText, Laptop2, Paperclip, PencilRuler, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { getStatusIcon } from "../../useShowProjectController";

interface PageCardProps {
  page: Jobs;
  disabled?: boolean;
  isLoadingDelete?: boolean;
  user: UserMe;
  deleteItem(id: string): void;
  approvedPage(id: string): void;
  desapprovedPage(id: string): void;
  inProgressPage(id: string): void;
  reviewPage(id: string): void;
  openModalDetails(): void;
  openModalEditPage(): void;
}

export function PageCard({
  page,
  disabled,
  isLoadingDelete,
  deleteItem,
  approvedPage,
  desapprovedPage,
  inProgressPage,
  reviewPage,
  openModalDetails,
  openModalEditPage,
  user
}: PageCardProps) {

  return (
    <Card
      className={`border-l-4 transition-all hover:shadow-md ${getCardColorClass(page.status)}`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg max-w-[160px]">{page.page}</CardTitle>
          <Badge variant="outline" className={`flex items-center gap-1 ${getCardColorClass(page.status) }`}>
            {getStatusIcon(page.status)}
            <span className={`${getTextBadgeColorClass(page.status)}`}>
              {getStatusText(page.status)}
            </span>
          </Badge>
        </div>
        <CardDescription className="flex items-center justify-between">
          <span>
            Última atualização:<br />
            {format(page.updated_at ? new Date(page.updated_at) : new Date(), "dd/MM/yyyy")}
          </span>
          {(page.files!.length > 0) && (
            <span className="flex items-center text-xs">
              <Paperclip className="h-3 w-3 mr-1" />
              {page.files?.length} {page.files?.length === 1 ? "arquivo" : "arquivos"}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">{page.content}</p>
      </CardContent>
      <CardFooter className="flex gap-2 pt-0">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild disabled={disabled}>
              <Button variant="outline" size="icon" className="w-8 h-8" onClick={openModalDetails}>
                <FileText className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Detalhes</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {user.data.level === 'ADMIN' && (
          <>
            {page.status !== "approved" && (
              <TooltipProvider delayDuration={0}>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild disabled={disabled}>
                    <Button variant="outline" size="icon" className="w-8 h-8" onClick={openModalEditPage}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Editar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            <TooltipProvider delayDuration={0}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger disabled={disabled} className="disabled:pointer-events-none disabled:opacity-50">
                  {isLoadingDelete ? (
                    <div className="w-8 h-8 flex items-center rounded-md justify-center bg-red-500 text-white hover:bg-red-800">
                      <Spinner className="w-4 h-4 mr-0 fill-white" />
                    </div>
                  ) : (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <div className="w-8 h-8 flex items-center rounded-md justify-center bg-red-500 text-white hover:bg-red-800">
                          <Trash2 className="w-4 h-4" />
                        </div>
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
                          <AlertDialogAction onClick={() => deleteItem(page.id)}>Confirmar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}

                </TooltipTrigger>
                <TooltipContent>
                  <p>Excluir</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {(page.status !== "approving" && page.status !== "approved") && (
              <TooltipProvider delayDuration={0}>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild disabled={disabled}>
                    <Button onClick={() => inProgressPage(page.id)} size="icon" className="w-8 h-8">
                      <Laptop2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>

                    <p>Trabalhando</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {(page.status !== "approved" && page.status !== "changing") && (
              <TooltipProvider delayDuration={0}>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild disabled={disabled}>
                    <Button onClick={() => reviewPage(page.id)} size="icon" className="bg-yellow-500 hover:bg-yellow-600 w-8 h-8">
                      <PencilRuler className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>

                    <p>Em Revisão</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {page.status !== "approved" && (
              <TooltipProvider delayDuration={0}>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild disabled={disabled}>
                    <Button onClick={() => approvedPage(page.id)} size="icon" className="bg-green-500 hover:bg-green-600 w-8 h-8">
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>

                    <p>Aprovar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {page.status === "approved" && (
              <TooltipProvider delayDuration={0}>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild disabled={disabled}>
                    <Button onClick={() => desapprovedPage(page.id)} size="icon" className="bg-slate-500 hover:bg-slate-600 w-8 h-8">
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>

                    <p>Desaprovar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  )
}
