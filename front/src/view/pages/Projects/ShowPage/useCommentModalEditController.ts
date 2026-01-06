import { commentsService } from "@/app/services/commentsService";
import { UpdateCommentParams } from "@/app/services/commentsService/update";
import { messageService } from "@/app/services/messageService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FileComment = {
  id: string;
  name: string;
  size?: string;
  type?: string;
  url: string;
}

const schema = z.object({
  content: z.string().min(1, 'Comentário é obrigatório'),
  files: z.array(z.any()).optional().nullable(),
});

type FormData = z.infer<typeof schema>

export function useCommentModalEditController(closeModal: () => void, commentId?: string, userCommentId?: string) {
  const queryClient = useQueryClient();
  const [sendComment, setSendComment] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [filesComment, setFilesComment] = useState<FileComment[] | null | undefined>(null);
  const [deletingFileId, setDeletingFileId] = useState<string | null>(null);

  const {
    control,
    reset,
    handleSubmit: hookFormSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { data: dataMessage } = useQuery({
    queryKey: ['messages'],
    staleTime: 0,
    queryFn: async () => {
      const response = await messageService.getAll();

      return response;
    },
  });

  const { data: dataComment } = useQuery({
    queryKey: ['comment', commentId],
    staleTime: 0,
    queryFn: async () => {
      const response = await commentsService.getById(commentId!);

      return response;
    },
  });

  const {
    mutateAsync: mutateAsyncDeleteFileComment
  } = useMutation({
    mutationFn: async (id: string) => {
      return commentsService.removeFile(id);
    }
  });

  const { isPending: isLoadingUpdateComment, mutateAsync } = useMutation({
    mutationFn: async (data: UpdateCommentParams) => {
      return commentsService.update(data);
    }
  });

  useEffect(() => {
    if (commentId && userCommentId) {
      setValue("content", dataComment?.data.content || "");
      setFilesComment(dataComment?.data.files || null);
      setSelectedMessageId('');
    }
  }, [commentId, dataComment?.data.content, dataComment?.data.files, setValue, userCommentId])

  const handleSelectMessage = (messageId: string) => {
    setSelectedMessageId(messageId);

    const selectedMessage = dataMessage?.data.find(msg => msg.id === messageId);
    if (selectedMessage) {
      setValue("content", selectedMessage.content);
    }
  };

  async function removeFileComment(fileId: string) {
    try {
      setDeletingFileId(fileId);
      await mutateAsyncDeleteFileComment(fileId);
      queryClient.invalidateQueries({ queryKey: ['comment', commentId] });
      queryClient.invalidateQueries({ queryKey: ['viewjob'] });
      toast.success('arquivo deletado com sucesso!');
    } catch (error) {
      toast.error('Erro ao deletar o arquivo!');
    } finally {
      setDeletingFileId(null);
    }
  }

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        id: commentId!,
        user_id: userCommentId!
      });

      toast.success('Comentário atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['viewjob'] });
      setSendComment(true);
      reset();
      closeModal();
    } catch (error) {
      toast.error('Erro ao atualizar o comentário!');
    }
  });

  return {
    errors,
    control,
    sendComment,
    messages: dataMessage?.data || [],
    selectedMessageId,
    filesComment,
    isLoadingUpdateComment,
    deletingFileId,
    handleSubmit,
    handleSelectMessage,
    removeFileComment
  }
}
