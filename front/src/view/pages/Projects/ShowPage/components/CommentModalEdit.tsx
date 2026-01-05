import { removeTextNameFile } from "@/lib/utils";
import { CustomModal } from "@/view/components/CustomModal";
import { Button } from "@/view/components/ui/button";
import { DialogFooter } from "@/view/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/view/components/ui/select";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Loader2, MessageSquareMore, Paperclip, Trash } from "lucide-react";
import { Controller } from "react-hook-form";
import { UploadFiles } from "../../ShowProject/components/UploadFiles";
import { useCommentModalEditController } from "../useCommentModalEditController";

interface CommentModalEditProps {
  closeModal: () => void;
  openModalTech: boolean;
  commentId?: string;
  userCommentId: string;
}

export function CommentModalEdit({ closeModal, openModalTech, commentId, userCommentId }: CommentModalEditProps) {
  const {
    control,
    errors,
    sendComment,
    messages,
    selectedMessageId,
    filesComment,
    isLoadingUpdateComment,
    handleSubmit,
    handleSelectMessage,
    removeFileComment
  } = useCommentModalEditController(closeModal,commentId, userCommentId);

  return (
    <CustomModal
      closeModal={closeModal}
      openModalTech={openModalTech}
      title={'Editar Comentário'}
      icon={<MessageSquareMore className="h-5 w-5 text-primary" />}
      description={'Edite os dados do comentário abaixo.'}
    >
      <form onSubmit={handleSubmit}>
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

        {(filesComment && filesComment?.length > 0) && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Arquivos Cadastrados:</label>

            <div className="max-h-[140px] overflow-y-auto pr-2 scroll-selected-files space-y-2">
              {filesComment?.map((file) => (
                  <div key={file.id} className="flex items-center justify-between bg-muted p-2 rounded-md">
                    <div className="flex items-center">
                      <Paperclip className="h-4 w-4 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium truncate max-w-[200px] lg:max-w-[100%]">
                          {removeTextNameFile(file.name, 'comments/')}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 flex-shrink-0"
                      type="button"
                      onClick={() => removeFileComment(file.id)}
                    >
                      <Trash className="h-3 w-3" />
                    </Button>
                  </div>
              ))}
            </div>
          </div>
        )}

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
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={closeModal}
            className="bg-white text-slate-600 border-slate-300"
          >
            Cancelar
          </Button>
          <Button type="submit" className="bg-primary text-white" disabled={isLoadingUpdateComment}>
            {isLoadingUpdateComment && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar Alterações
          </Button>
        </DialogFooter>
      </form>
    </CustomModal>
  )
}
