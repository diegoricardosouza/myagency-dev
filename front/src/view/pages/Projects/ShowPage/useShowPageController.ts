/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuth } from "@/app/hooks/useAuth";
import { commentsService } from "@/app/services/commentsService";
import { CommentsParams } from "@/app/services/commentsService/create";
import { jobsService } from "@/app/services/jobs";
import { SendApprovedParams } from "@/app/services/jobs/sendApproved";
import { UpdateJobParams } from "@/app/services/jobs/update";
import { messageService } from "@/app/services/messageService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  content: z.string().min(1, 'Comentário é obrigatório'),
  files: z.array(z.any()).optional().nullable(),
});

type FormData = z.infer<typeof schema>

export function useShowPageController() {
  const { id, idPage } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [openModalComment, setOpenModalComment] = useState(false);
  const [sendComment, setSendComment] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [openCommentMessageModal, setOpenCommentMessageModal] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [userCommentId, setUserCommentId] = useState('');

  const {
    control,
    reset,
    handleSubmit: hookFormSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { data: jobData, isPending } = useQuery({
    queryKey: ['viewjob', idPage],
    staleTime: 0,
    queryFn: async () => {
      try {
        const response = await jobsService.getById(idPage!);
        return response;
      } catch (error) {
        toast.error('Página não encontrada');
        navigate("/");
      }
    }
  });

  const { data: dataMessage, isLoading } = useQuery({
    queryKey: ['messages'],
    staleTime: 0,
    queryFn: async () => {
      const response = await messageService.getAll();

      return response;
    },
  });

  const {
    isPending: isLoadingCreateComment,
    mutateAsync
  } = useMutation({
    mutationFn: async (data: CommentsParams) => {
      return commentsService.create(data);
    }
  });

  const {
    isPending: isLoadingDeleteComment,
    mutateAsync: mutateAsyncDeleteComment
  } = useMutation({
    mutationFn: async (id: string) => {
      return commentsService.remove(id);
    }
  });

  const {
    mutateAsync: mutateChangeStatus,
    isPending: isPendingChangeStatus
  } = useMutation({
    mutationFn: async (data: UpdateJobParams) => {
      return jobsService.update(data);
    }
  });

  const {
    mutateAsync: mutateSendApproved,
    isPending: isPendingSendApproved
  } = useMutation({
    mutationFn: async (data: SendApprovedParams) => {
      return jobsService.sendApproved(data);
    }
  });

  const handleSelectMessage = (messageId: string) => {
    setSelectedMessageId(messageId);

    const selectedMessage = dataMessage?.data.find(msg => msg.id === messageId);
    if (selectedMessage) {
      setValue("content", selectedMessage.content);
    }
  };

  // const {
  //   mutateAsync: mutateWhatsApp
  // } = useMutation({
  //   mutationFn: async (data: SendWhatsAppParams) => {
  //     return whatsAppService.sendComment(data);
  //   }
  // });

  function openCommentModal() {
    setOpenModalComment(true);
  }

  function closeCommentModal() {
    setOpenModalComment(false);
  }

  function openCommentMessageModalFn(commentId: string, userCommentId: string) {
    setCommentId(commentId);
    setUserCommentId(userCommentId);
    queryClient.invalidateQueries({ queryKey: ['comment', commentId] });

    setOpenCommentMessageModal(true);
  }

  function closeCommentMessageModal() {
    setOpenCommentMessageModal(false);
    reset();
  }

  async function handleApprovedStatus() {
    try {
      await mutateChangeStatus({
        id: idPage!,
        status: "approved"
      });

      const emailData = {
        email: 'marcelo@inovasite.com',
        cliente: jobData?.data.project?.user.corporate_name || jobData?.data.project?.user.fantasy_name || "",
        nomeprojeto: jobData!.data.project!.project_name,
        tipoprojeto: jobData!.data.project!.type,
        pagina: jobData!.data.page
      };

      await mutateSendApproved(emailData);

      queryClient.invalidateQueries({ queryKey: ['viewjob'] });
      toast.success('Página aprovada!');
    } catch (error) {
      toast.error('Erro ao alterar status!');
    }
  }

  async function handleApprovingStatus() {
    try {
      await mutateChangeStatus({
        id: idPage!,
        status: "approving"
      });

      queryClient.invalidateQueries({ queryKey: ['viewjob'] });
      toast.success('Enviado para aprovação!');
    } catch (error) {
      toast.error('Erro ao alterar status!');
    }
  }

  async function handleOpenPageStatus() {
    try {
      await mutateChangeStatus({
        id: idPage!,
        status: "pending"
      });
      queryClient.invalidateQueries({ queryKey: ['viewjob'] });
      toast.success('Página reaberta com sucesso!');
    } catch (error) {
      toast.error('Erro ao alterar status!');
    }
  }

  async function deleteComment(commentId: string) {
    try {
      await mutateAsyncDeleteComment(commentId);
      queryClient.invalidateQueries({ queryKey: ['viewjob'] });
      toast.success('Comentário deletado com sucesso!');
    } catch (error) {
      toast.error('Erro ao deletar o comentário!');
    }
  }

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      if (user?.data.level === 'CLIENTE') {
        await mutateChangeStatus({
          id: idPage!,
          status: "changing"
        });
        queryClient.invalidateQueries({ queryKey: ['viewjob'] });
        setSendComment(true);
        reset();
      }

      await mutateAsync({
        ...data,
        job_id: idPage!,
        user_id: user!.data.id
      });

      // TODO: ENVIAR MENSAGEM NO WHATSAPP
      // await mutateWhatsApp({
      //   phone: formatPhoneNumber(jobData!.data.project!.user.cellphone),
      //   message: `
      //     Olá tudo bem?\nSua espera acabou!\n Página:jobData?.data.page \n Acesse o link abaixo para conferir!\n${import.meta.env.VITE_PROJECT_URL}/projetos/detalhes/${id}/page/${idPage}
      //   `
      // })

      queryClient.invalidateQueries({ queryKey: ['viewjob'] });
      setSendComment(true);
      toast.success('Comentário cadastrado com sucesso!');
      // if (user?.data.level === 'ADMIN') {
      //   openCommentModal();
      // }
      reset();
      // navigate(0);
    } catch (error) {
      toast.error('Erro ao cadastrar o comentário!');
    }
  });

  return {
    errors,
    control,
    isLoadingCreateComment,
    openModalComment,
    user,
    whatsapp: jobData?.data.project?.user.cellphone,
    currentPage: jobData?.data,
    comments: jobData?.data.comments,
    idJob: id,
    idPage,
    sendComment,
    isPendingChangeStatus,
    isPending,
    messages: dataMessage?.data || [],
    isLoading,
    selectedMessageId,
    isLoadingDeleteComment,
    openCommentMessageModal,
    isPendingSendApproved,
    commentId,
    userCommentId,
    handleSubmit,
    closeCommentModal,
    handleApprovedStatus,
    handleApprovingStatus,
    handleOpenPageStatus,
    openCommentModal,
    handleSelectMessage,
    deleteComment,
    closeCommentMessageModal,
    openCommentMessageModalFn
  }
}
