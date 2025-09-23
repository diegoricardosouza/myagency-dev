import { Comments } from "@/app/entities/Comments";
import { isImageFile } from "@/lib/utils";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/view/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/view/components/ui/avatar";
import { Badge } from "@/view/components/ui/badge";
import { Button } from "@/view/components/ui/button";
import { format } from "date-fns";
import { SlideshowLightbox } from "lightbox.js-react";
import 'lightbox.js-react/dist/index.css';
import { AlertTriangle, Download, Edit3, Eye, FileArchive, Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Thumbnail } from "./Thumbnail";

interface CommentsListProps {
  userId: string;
  comment: Comments;
  logo?: string;
  userLevel: string;
  openCommentMessageModalFn: (commentId: string, userCommentId: string) => void;
  deleteComment: (commentId: string) => void;
}

export function CommentsList({
  userId,
  comment,
  logo,
  userLevel,
  openCommentMessageModalFn,
  deleteComment
}: CommentsListProps) {
  // helper para trocar /storage/ por /files/
  const toFilesUrl = (url: string) => url.replace(/\/storage\//, "/files/");

  // Adicionar estilos customizados para o lightbox
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .lightboxjs-lightbox {
        z-index: 9999 !important;
      }
      .lightboxjs-lightbox img {
        max-width: 95vw !important;
        max-height: 95vh !important;
        width: auto !important;
        height: auto !important;
        object-fit: contain !important;
        margin: auto !important;
        display: block !important;
      }
      .lightboxjs-lightbox-content {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 100% !important;
        height: 100% !important;
        padding: 20px !important;
        box-sizing: border-box !important;
      }
      .lightboxjs-lightbox-backdrop {
        background: rgba(0, 0, 0, 0.9) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

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

                {userLevel === 'ADMIN' && (
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-md text-blue-500 hover:text-blue-500 hover:bg-blue-200"
                      onClick={() => openCommentMessageModalFn(comment.id, comment.user.id)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-md text-red-500 hover:text-red-700 hover:bg-red-100"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            Excluir comentário
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir este comentário? Esta ação não pode ser desfeita
                            e todos os arquivos anexados também serão removidos.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteComment(comment.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
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
                  {comment.files.map((file, index) => {
                    return (
                    <div
                      key={index}
                      className={`border overflow-hidden bg-white shadow-sm group hover:shadow-md transition-shadow rounded-lg ${comment.user.id === userId ? "border-blue-200" : "border-gray-200"
                        }`}
                    >
                      <div className="relative h-[130px] w-full">
                        {(file.url && isImageFile(file.url)) ? (
                          // <img
                          //   src={file.url || "/placeholder.svg"}
                          //   alt={file.name}
                          //   className="w-full h-[130px] object-cover"
                          // />
                          <Thumbnail
                            src={toFilesUrl(file.url) || "/placeholder.svg"}
                          />
                        ) : (
                          <div className="h-[130px] w-full flex items-center justify-center bg-gray-100">
                            <FileArchive className="w-9 h-9" />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/90 hover:bg-white border-0 text-gray-800"
                            onClick={() => handleDownload(file.url!, file.name.replace('comments/', ''))}
                          >
                            <Download className="h-4 w-4" />
                          </Button>

                          {isImageFile(file.url) && (
                            <SlideshowLightbox
                                lightboxIdentifier={`lightbox-${comment.id}`}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-white/90 hover:bg-white border-0 text-gray-800"
                                  data-lightboxjs={`lightbox-${comment.id}`}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>

                              {/* Imagem para o lightbox */}
                              <img
                                src={file.url}
                                alt=""
                                className="hidden"
                                data-lightboxjs={`lightbox-${comment.id}`}
                              />
                            </SlideshowLightbox>
                          )}


                          {/* <SlideshowLightbox lightboxIdentifier="lightbox1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/90 hover:bg-white border-0 text-gray-800"
                              data-lightboxjs="lightbox1"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Baixar2
                            </Button>
                            <img src={file.url} alt="" className="hidden" data-lightboxjs="lightbox1" />
                          </SlideshowLightbox> */}

                          {/* <Image
                            className="aspect-square rounded-lg mb-1 w-[100px] h-[100px] md:w-[60px] md:h-[60px] object-cover"
                            image={{ src: file.url, title: file.name.replace('comments/', ''),  }}
                            modalClose="clickOutside"
                          /> */}

                        </div>
                      </div>
                      <div className="p-3 border-t border-gray-100">
                        <p className="text-sm font-medium text-gray-700 truncate">{file.name.replace('comments/', '')}</p>
                      </div>
                    </div>
                  )})}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
