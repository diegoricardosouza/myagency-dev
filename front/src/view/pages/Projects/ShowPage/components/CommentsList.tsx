import { Comments } from "@/app/entities/Comments";
import { isImageFile } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/view/components/ui/avatar";
import { Badge } from "@/view/components/ui/badge";
import { Button } from "@/view/components/ui/button";
import { format } from "date-fns";
import { Download, FileArchive } from "lucide-react";
import { toast } from "sonner";

interface CommentsListProps {
  userId: string;
  comment: Comments;
  logo?: string
}

export function CommentsList({ userId, comment, logo }: CommentsListProps) {
  // helper para trocar /storage/ por /files/
  const toFilesUrl = (url: string) => url.replace(/\/storage\//, "/files/");

  // Função para lidar com o download do arquivo
  const handleDownload = async (url: string, fileName: string) => {
    try {
      const response = await fetch(toFilesUrl(url));

      if (!response.ok) {
        throw new Error(`Erro ao baixar o arquivo: ${response.statusText}`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Erro ao baixar o arquivo:", error);
      toast.error("Não foi possível baixar o arquivo. Por favor, tente novamente.");
    }
  };

  return (
    <div
      className={`transition-colors ${comment.user.id === userId ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-gray-50"
        }`}
    >
      <div className="p-6">
        <div className="flex gap-4">
          <Avatar
            className={`w-10 h-10 border-2 ${comment.user.id === userId ? "border-blue-300 shadow-sm" : "border-gray-100  shadow-sm"
              }`}
          >
            <AvatarImage src={logo ? logo : '/placeholder-user.jpg'} alt={comment.user.corporate_name || comment.user.fantasy_name} />
            <AvatarFallback
              className={`${comment.user.id === userId
                ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white"
                : "bg-gradient-to-br from-gray-500 to-gray-600 text-white"
                }`}
            >
              {comment.user.corporate_name ? comment.user.corporate_name.substring(0, 2) : comment.user.fantasy_name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="block md:flex justify-between items-center mb-2 min-h-9">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-800">{comment.user.corporate_name || comment.user.fantasy_name}</span>
                {comment.user.id === userId && (
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0 text-xs">
                    Você
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-normal text-gray-500">
                  Última atualização: {comment.updated ? format(comment.updated, 'dd/MM/yyyy H:mm') : ''}
                </span>
              </div>
            </div>

            <div className="text-gray-700 mb-4">
              <div
                className="text-gray-700 max-h-[200px] overflow-auto"
                dangerouslySetInnerHTML={{ __html: comment.content as string }}
              />
            </div>

            {(comment.files && comment.files?.length > 0) && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-600 mb-2">Arquivos:</p>
                <div className="grid gap-4 sm:grid-cols-4">
                  {comment.files.map((file, index) => (
                    <div
                      key={index}
                      className={`border overflow-hidden bg-white shadow-sm group hover:shadow-md transition-shadow rounded-lg ${comment.user.id === userId ? "border-blue-200" : "border-gray-200"
                        }`}
                    >
                      <div className="relative h-[130px] w-full">
                        {(file.url && isImageFile(file.url)) ? (
                          <img
                            src={file.url || "/placeholder.svg"}
                            alt={file.name}
                            className="w-full h-[130px] object-cover"
                          />
                        ) : (
                          <div className="h-[130px] w-full flex items-center justify-center bg-gray-100">
                            <FileArchive className="w-9 h-9" />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/90 hover:bg-white border-0 text-gray-800"
                            onClick={() => handleDownload(file.url!, file.name.replace('comments/', ''))}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Baixar
                          </Button>
                        </div>
                      </div>
                      <div className="p-3 border-t border-gray-100">
                        <p className="text-sm font-medium text-gray-700 truncate">{file.name.replace('comments/', '')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
