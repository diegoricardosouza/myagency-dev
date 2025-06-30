import { Message } from "@/app/entities/Message";
import { truncateText } from "@/lib/utils";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/view/components/ui/alert-dialog";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/view/components/ui/card";
import { Separator } from "@/view/components/ui/separator";
import { Edit2, FileText, Trash2 } from "lucide-react";

interface CardMessageProps {
  message: Message;
  expandedMessages: Set<string>;
  toggleMessageExpansion: (messageId: string) => void;
  handleDeleteItem: (messageId: string) => void;
  handleEditMessage: (messageId: string) => void;
}

export function CardMessage({ message, expandedMessages, toggleMessageExpansion, handleDeleteItem, handleEditMessage }: CardMessageProps) {
  return (
    <Card
      className="bg-white/70 backdrop-blur-sm border-slate-200 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg text-slate-800">{message.name}</CardTitle>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
              onClick={() => handleEditMessage(message.id)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger
                className="bg-white text-red-600 border transition-all border-red-200 hover:bg-red-50 h-9 px-3 rounded-md"
              >
                <Trash2 className="w-4 h-4" />
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
                  <AlertDialogAction onClick={() => handleDeleteItem(message.id)}>Confirmar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <Separator className="bg-slate-200" />
      <CardContent className="pt-4">
        <div className="space-y-3 content-paragraph">
          {expandedMessages.has(message.id) ? (
            <div
              className="text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: message.content || "" }}
            />
          ) : (
            <div
              className="text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: expandedMessages.has(message.id)
                  ? message.content || ""
                  : truncateText(message.content || ""),
              }}
            />
          )}

          {message.content?.length > 200 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleMessageExpansion(message.id)}
              className="text-primary hover:text-blue-900 hover:bg-transparent p-0 h-auto font-medium"
            >
              {expandedMessages.has(message.id) ? "Ver menos" : "Ver mais"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
