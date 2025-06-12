import { useAuth } from "@/app/hooks/useAuth";
import { commentsService } from "@/app/services/commentsService";
import { CommentsParams } from "@/app/services/commentsService/create";
import { jobsService } from "@/app/services/jobs";
import { UpdateJobParams } from "@/app/services/jobs/update";
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

  const {
    control,
    reset,
    handleSubmit: hookFormSubmit,
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

  const {
    isPending: isLoadingCreateComment,
    mutateAsync
  } = useMutation({
    mutationFn: async (data: CommentsParams) => {
      return commentsService.create(data);
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

  async function handleApprovedStatus() {
    try {
      await mutateChangeStatus({
        id: idPage!,
        status: "approved"
      });
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

  // console.log(formatPhoneNumber(jobData?.data.project?.user.cellphone));


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
      if (user?.data.level === 'ADMIN') {
        openCommentModal();
      }
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
    handleSubmit,
    closeCommentModal,
    handleApprovedStatus,
    handleApprovingStatus,
    handleOpenPageStatus,
    openCommentModal
  }
}
