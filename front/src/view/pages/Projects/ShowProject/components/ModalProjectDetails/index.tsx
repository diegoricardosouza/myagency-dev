import { Jobs } from "@/app/entities/Jobs";
import { formatBytes, getCardColorClass, getStatusText, getTextBadgeColorClass } from "@/lib/utils";
import { Spinner } from "@/view/components/Spinner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/view/components/ui/alert-dialog";
import { Badge } from "@/view/components/ui/badge";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";
import { Separator } from "@/view/components/ui/separator";
import { format } from "date-fns";
import { ExternalLink, FileText, ThumbsUp } from "lucide-react";
import { getStatusIcon } from "../../useShowProjectController";

interface ModalProjectDetailsProps {
  page?: Jobs;
  open: boolean;
  onOpenChange(): void;
  userLevel: string | undefined
  approvedPage(id: string): void;
  isLoading: boolean;
}

export function ModalProjectDetails({
  page,
  open,
  onOpenChange,
  approvedPage,
  userLevel,
  isLoading
}: ModalProjectDetailsProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent className="max-w-4xl overflow-hidden min-h-[600px]">
        {isLoading && (
          <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-white z-10">
            <Spinner className="w-6 h-6 fill-primary" />
          </div>
        )}

        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <span>{page?.page}</span>
            <Badge variant="outline" className={`flex items-center gap-1 ${page && getCardColorClass(page.status)} bg-white`}>
              {page && getStatusIcon(page.status)}
              <span className={`${page && getTextBadgeColorClass(page.status)}`}>
                {page && getStatusText(page.status)}
              </span>
            </Badge>
          </AlertDialogTitle>
          <AlertDialogDescription className="line-clamp-3">{page?.content}</AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-4">
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">ID da Página</p>
                <p className="text-muted-foreground">{page?.id}</p>
              </div>
              <div>
                <p className="font-medium">Última Atualização</p>
                <p className="text-muted-foreground">
                  {page?.updated_at && format(page?.updated_at as string | number | Date, "dd/MM/yyyy")}
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4">Arquivos</h3>
              {page?.files?.length === 0 ? (
                <p className="text-muted-foreground text-sm">Nenhum arquivo disponível para esta página.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[234px] overflow-y-auto scroll-selected-files">
                  {page?.files?.map((file) => (
                    <Card key={file.id} className="overflow-hidden">
                      {file.type?.startsWith("image/") ? (
                        <div className="relative h-40 w-full">
                          <img src={file.url || "/placeholder.svg"} alt={file.name} className="object-cover h-40 w-full" />
                        </div>
                      ) : (
                        <div className="h-40 flex items-center justify-center bg-muted">
                          <FileText className="h-16 w-16 text-muted-foreground" />
                        </div>
                      )}
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex-1">
                            <p className="text-xs font-medium truncate max-w-[237px] lg:max-w-[130px]">
                              {file.name.replace('jobs/', '')}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatBytes(Number(file.size), 0)} •&nbsp;
                              {file.created_at && format(file.created_at, "dd/MM/yyyy")}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => window.open(file.url, "_blank")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <Separator />
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Fechar</AlertDialogCancel>
          {(userLevel === 'ADMIN' && page?.status !== "approved") && (
            <AlertDialogAction className="bg-green-500 hover:bg-green-600"
              onClick={() => page && approvedPage(page.id)}
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              Aprovar Página
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
