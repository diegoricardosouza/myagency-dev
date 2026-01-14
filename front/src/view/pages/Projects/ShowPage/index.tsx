import { Spinner } from "@/view/components/Spinner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/view/components/ui/alert-dialog";
import { Badge } from "@/view/components/ui/badge";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/view/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/view/components/ui/select";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ArrowLeft, CircleX, Loader2, PencilRuler, RotateCcw, ThumbsUp } from "lucide-react";
import { Controller } from "react-hook-form";
import { SiWhatsapp } from "react-icons/si";
import { Link } from "react-router-dom";
import { UploadFiles } from "../ShowProject/components/UploadFiles";
import { CommentModalEdit } from "./components/CommentModalEdit";
import { CommentsList } from "./components/CommentsList";
import { useShowPageController } from "./useShowPageController";

export function ShowPage() {
  const {
    errors,
    control,
    comments,
    user,
    isLoadingCreateComment,
    idJob,
    currentPage,
    sendComment,
    isPendingChangeStatus,
    isPending,
    messages,
    selectedMessageId,
    isLoadingDeleteComment,
    openCommentMessageModal,
    isPendingSendApproved,
    commentId,
    userCommentId,
    sendWhats,
    handleSubmit,
    handleApprovedStatus,
    handleApprovingStatus,
    handleOpenPageStatus,
    handleSelectMessage,
    deleteComment,
    closeCommentMessageModal,
    openCommentMessageModalFn,
    sendWhatsAppNotification
  } = useShowPageController();

  return (
    <div className="w-full mx-auto lg:p-6 font-sans min-h-screen relative">
      {isPending || isLoadingDeleteComment && (
        <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-white z-10">
          <Spinner className="w-6 h-6 fill-primary" />
        </div>
      )}

      <div className="mb-8">
        <div className="block md:flex items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-gray-800">
              {currentPage?.page}
            </h1>
            <div className="h-1 w-20 bg-primary rounded-full mt-2"></div>
          </div>

          <div className="space-x-4">
            {user?.data.level === 'ADMIN' && (
              <Button
                className="bg-[#25d366] hover:bg-[#128c7e] text-white font-medium py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all mb-4"
                onClick={sendWhatsAppNotification}
              >
                {sendWhats ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <SiWhatsapp className="mr-2 h-4 w-4" />
                    Compartilhar
                  </>
                )}
              </Button>
            )}

            {(currentPage?.status !== 'approved' && user?.data.level === 'CLIENTE') && (
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all mb-4"
                    asChild
                  >
                    <a>
                      <ThumbsUp className="mr-2 h-4 w-4" /> Aprovar
                    </a>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Você deseja realmente aprovar esta página?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Lembrando que, após a aprovação, não será mais possível editar ou enviar novos conteúdos.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleApprovedStatus}>
                      Confirmar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            {(currentPage?.status !== 'approving' && currentPage?.status !== 'approved' && user?.data.level === 'ADMIN') && (
              <Button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all mb-4" onClick={handleApprovingStatus}
                disabled={isPendingChangeStatus}
                type="button"
              >
                {isPendingChangeStatus ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                  <>
                    <PencilRuler className="mr-2 h-4 w-4" />
                    Enviar para aprovação
                  </>
                )}
              </Button>
            )}

            {(currentPage?.status !== 'approved' && user?.data.level === 'ADMIN') && (
              <Button
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all mb-4" onClick={handleApprovedStatus}
                disabled={isPendingChangeStatus}
                type="button"
              >
                {isPendingChangeStatus || isPendingSendApproved ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                  <>
                    <CircleX className="mr-2 h-4 w-4" />
                    Fechar
                  </>
                )}
              </Button>
            )}

            {(currentPage?.status === 'approved' && user?.data.level === 'ADMIN') && (
              <Button
                className="bg-zinc-950 hover:bg-zinc-800 text-white font-medium py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all mb-4" onClick={handleOpenPageStatus}
                disabled={isPendingChangeStatus}
                type="button"
              >
                {isPendingChangeStatus ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                  <>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reabrir
                  </>
                )}
              </Button>
            )}

            <Button
              asChild
              className="text-white font-medium py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all mb-4"
            >
              <Link to={`/projetos/detalhes/${idJob}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Coluna de comentários */}
        <div className="md:col-span-7">
          <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
            <CardHeader className="bg-white border-b p-6">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold text-gray-800">Comentários</CardTitle>
                <Badge variant="outline" className="px-3 py-1 bg-blue-50 text-blue-600 border-blue-200">
                  {comments?.length} comentários
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-0 divide-y">
              {comments?.map((comment) => (
                <CommentsList
                  key={comment.id}
                  comment={comment}
                  userId={user!.data.id}
                  userLevel={user!.data.level}
                  deleteComment={deleteComment}
                  openCommentMessageModalFn={openCommentMessageModalFn}
                />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Coluna de formulário */}
        <div className="md:col-span-5">
          {currentPage?.status !== 'approved' && (
            <Card className="border-0 shadow-lg rounded-xl overflow-hidden sticky top-6">
              <CardHeader className="bg-white border-b p-6">
                <CardTitle className="text-xl font-bold text-gray-800">Comentar</CardTitle>
              </CardHeader>

              <CardContent className="p-6">
                <form onSubmit={handleSubmit}>
                  {user?.data.level === 'ADMIN' && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem:</label>

                      <div className="flex items-center gap-2">
                        <Select
                          value={selectedMessageId || ""}
                          onValueChange={handleSelectMessage}
                        >
                          <SelectTrigger className="bg-white/70 backdrop-blur-sm border-slate-200">
                            <SelectValue placeholder="Selecionar uma mensagem" />
                          </SelectTrigger>
                          <SelectContent>
                            {messages.map((message) => (
                              <SelectItem key={message.id} value={message.id}>{message.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Comentário:</label>

                    <div className="w-full max-w-[258px] sm:max-w-full">
                      <Controller
                        control={control}
                        name="content"
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                          <div onClick={(e) => e.stopPropagation()}>
                            <CKEditor
                              editor={ClassicEditor}
                              data={value}
                              config={{
                                licenseKey: 'GPL',
                                language: 'pt-br'
                              }}
                              onChange={(_event, editor) => {
                                const data = editor.getData();
                                onChange(data);
                              }}
                            />
                          </div>
                        )}
                      />
                    </div>
                    {errors?.content?.message && (
                      <div className="flex gap-2 items-center text-red-700">
                        <span className="text-xs">{errors?.content?.message}</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Arquivos:</label>
                    <Controller
                      control={control}
                      name="files"
                      defaultValue={null}
                      render={({ field: { onChange } }) => (
                        <UploadFiles
                          onChange={onChange}
                          sendComment={sendComment}
                        />
                      )}
                    />

                    {errors?.files?.message && (
                      <div className="flex gap-2 items-center text-red-700">
                        <span className="text-xs">{errors?.files?.message}</span>
                      </div>
                    )}

                    <div className="mt-3">
                      <p className="text-xs text-gray-500">
                        Arquivos permitidos (max: 20mb):
                        <br />
                        <span className="text-gray-600">
                          JPG, JPEG, PNG, GIF, SVG, PDF, DOC, DOCX, TXT, CSV, XLS, XLSX, ZIP, RAR
                        </span>
                      </p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all"
                    disabled={isLoadingCreateComment}
                  >
                    {isLoadingCreateComment && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Enviar comentário
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {commentId && userCommentId && (
        <CommentModalEdit
          closeModal={closeCommentMessageModal}
          openModalTech={openCommentMessageModal}
          commentId={commentId}
          userCommentId={userCommentId}
        />
      )}
    </div>
  )
}
