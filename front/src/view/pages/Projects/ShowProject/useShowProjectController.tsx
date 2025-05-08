import { Jobs } from "@/app/entities/Jobs";
import { Project } from "@/app/entities/Project";
import { useAuth } from "@/app/hooks/useAuth";
import { filesService } from "@/app/services/filesService";
import { jobsService } from "@/app/services/jobs";
import { JobParams } from "@/app/services/jobs/create";
import { UpdateJobParams } from "@/app/services/jobs/update";
import { mailService } from "@/app/services/mailService";
import { EmailFinisehdProjectParams } from "@/app/services/mailService/finishedProject";
import { EmailVerifyFinanceParams } from "@/app/services/mailService/verifyFinance";
import { projectsService } from "@/app/services/projectsService";
import { UpdateProjectParams } from "@/app/services/projectsService/update";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import {
  Clock,
  Edit,
  ThumbsUp
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

export type PageStatus = "pending" | "approved" | "approving" | "changing"

export interface ProjectFile extends File {
  id?: string;
  name: string;
  size: number;
  type: string;
  created_at?: string;
  url?: string;
}

const schema = z.object({
  name: z.string()
    .min(1, 'Título da Página é obrigatório'),
  description: z.string().optional().nullable(),
  files: z.array(z.any()).optional().nullable(),
});

export type FormData = z.infer<typeof schema>

export function useShowProjectController() {
  const navigate = useNavigate();
  const { id: idProject } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const idPage = useRef<string>('');
  const [project, setProject] = useState<Project>()
  const [isAddPageOpen, setIsAddPageOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [pageDetailOpen, setPageDetailOpen] = useState<Jobs>()
  const [pageEditOpen, setPageEditOpen] = useState(false)

  const {
    register,
    control,
    reset,
    setValue,
    handleSubmit: hookFormSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { data: pageData, isPending: isLoadingEditPage } = useQuery({
    queryKey: ['editJob', idPage.current],
    enabled: !!idPage.current,
    staleTime: 0,
    queryFn: async () => {
      try {
        const response = await jobsService.getById(idPage.current);
        return response;
      } catch (error) {
        toast.error('Item não encontrado');
        setIsDetailsOpen(false);
      }
    }
  });

  const { data: userEditData } = useQuery({
    queryKey: ['editProjeto', idProject],
    staleTime: 0,
    queryFn: async () => {
      try {
        const response = await projectsService.getById(idProject!);

        return response;
      } catch (error) {
        toast.error('Projeto não encontrado');
        navigate("/projetos");
      }
    }
  });

  useEffect(() => {
    if (pageData) {
      setValue('name', pageData?.data.page);
      setValue('description', pageData?.data.content);
    }
    if (pageData) {
      setPageDetailOpen(pageData?.data);
    }
  }, [isDetailsOpen, pageData, setValue]);

  const isChecklistComplete = useMemo(() => {
    return userEditData?.data.checklists.every((item) => item.active);
  }, [userEditData?.data.checklists]);

  const areAllPagesApproved = useMemo(() => {
    return userEditData?.data.jobs.every((page) => page.status === "approved");
  }, [userEditData?.data.jobs]);

  const { data: jobsData, isLoading: isLoadingJob } = useQuery({
    queryKey: ['jobs', idProject],
    staleTime: 0,
    queryFn: async () => {
      const response = await jobsService.getAllNoPagination(idProject);

      return response;
    },
  });

  useEffect(() => {
    if (userEditData) {
      setProject(userEditData.data);
    }
  }, [userEditData]);

  const openPageDetails = (id: string) => {
    idPage.current = id;
    setIsDetailsOpen(true);
  }

  const closePageDetails = () => {
    setIsDetailsOpen(false);
    queryClient.invalidateQueries({ queryKey: ['editJob', idPage.current] });
  }

  const openPageEdit = (id: string) => {
    idPage.current = id;
    setPageEditOpen(true);
  }

  const closePageEdit = () => {
    setPageEditOpen(false);
    queryClient.invalidateQueries({ queryKey: ['editJob', idPage.current] });
  }

  function onOpenModalPage() {
    setIsAddPageOpen(true);
    reset();
  }

  function onCloseModalPage() {
    setIsAddPageOpen(false);
    reset();
  }

  const { isPending: isPendingJob, mutateAsync } = useMutation({
    mutationFn: async (data: JobParams) => {
      return jobsService.create(data);
    }
  });

  const { isPending: isPendingEditJob, mutateAsync: mutateAsyncEditjob } = useMutation({
    mutationFn: async (data: UpdateJobParams) => {
      return jobsService.update(data);
    }
  });

  const {
    isPending: isLoadingDeleteJob,
    mutateAsync: removeJob
  } = useMutation({
    mutationFn: async (id: string) => {
      return jobsService.remove(id);
    }
  });

  const {
    isPending: isChangeStatusPage,
    mutateAsync: updatePageStatus
  } = useMutation({
    mutationFn: async (data: UpdateJobParams) => {
      return jobsService.update(data);
    }
  });

  const {
    isPending: isDeleteFilePage,
    mutateAsync: removeFilePage
  } = useMutation({
    mutationFn: async (id: string) => {
      return filesService.remove(id);
    }
  });

  async function removeFile(id: string) {
    console.log('remove file', id);
    try {
      await removeFilePage(id);

      queryClient.invalidateQueries({ queryKey: ['jobs', idProject] });
      queryClient.invalidateQueries({ queryKey: ['editJob', idPage.current] });
      toast.success('Arquivo deletado com sucesso!');
    } catch {
      toast.error('Erro ao deletar o arquivo!');
    }
  }

  const handleSubmitPage = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        page: data.name,
        content: data.description || '',
        files: data.files,
        project_id: idProject
      });

      queryClient.invalidateQueries({ queryKey: ['jobs', idProject] });
      toast.success('Página cadastrada com sucesso!');
      onCloseModalPage();
    } catch (error) {
      toast.error('Erro ao cadastrar a página');
    }
  });

  const handleEditPage = hookFormSubmit(async (data) => {
    try {
      await mutateAsyncEditjob({
        ...data,
        id: idPage.current,
        page: data.name,
        content: data.description,
        files: data.files
      });

      queryClient.invalidateQueries({ queryKey: ['jobs', idProject] });
      queryClient.invalidateQueries({ queryKey: ['editJob', idPage.current] });
      toast.success('Página atualizada com sucesso!');
      closePageEdit();
    } catch (error) {
      toast.error('Erro ao atualizar a página');
    }
  });

  async function handleDeletePage(id: string) {
    try {
      await removeJob(id);
      queryClient.invalidateQueries({ queryKey: ['jobs', idProject] });
      toast.success('A Página foi deletada com sucesso!');
    } catch {
      toast.error('Erro ao deletar a página!');
    }
  }

  async function handleChangingStatusPage(idPage: string) {
    try {
      await updatePageStatus({
        id: idPage!,
        status: "approved"
      });
      queryClient.invalidateQueries({ queryKey: ['jobs', idProject] });
      queryClient.invalidateQueries({ queryKey: ['editProjeto', idProject] });
      toast.success('Página aprovada!');
    } catch (error) {
      toast.error('Erro ao alterar status!');
    }
  }

  async function handleDesapprovedPageStatusPage(idPage: string) {
    try {
      await updatePageStatus({
        id: idPage!,
        status: "pending"
      });
      queryClient.invalidateQueries({ queryKey: ['jobs', idProject] });
      queryClient.invalidateQueries({ queryKey: ['editProjeto', idProject] });
      toast.success('Status alterado com sucesso!');
    } catch (error) {
      toast.error('Erro ao alterar status!');
    }
  }

  async function handleInProgressStatusPage(idPage: string) {
    try {
      await updatePageStatus({
        id: idPage!,
        status: "approving"
      });
      queryClient.invalidateQueries({ queryKey: ['jobs', idProject] });
      queryClient.invalidateQueries({ queryKey: ['editProjeto', idProject] });
      toast.success('Status alterado com sucesso!');
    } catch (error) {
      toast.error('Erro ao alterar status!');
    }
  }

  async function handleReviewStatusPage(idPage: string) {
    try {
      await updatePageStatus({
        id: idPage!,
        status: "changing"
      });
      queryClient.invalidateQueries({ queryKey: ['jobs', idProject] });
      queryClient.invalidateQueries({ queryKey: ['editProjeto', idProject] });
      toast.success('Status alterado com sucesso!');
    } catch (error) {
      toast.error('Erro ao alterar status!');
    }
  }

  const { isPending: isPendingMailFinance, mutateAsync: mutateAsyncMailFinance } = useMutation({
    mutationFn: async (data: EmailVerifyFinanceParams) => {
      return mailService.verifyFinance(data);
    }
  });

  async function handleSendMailfinance() {
    try {
      await mutateAsyncMailFinance({
        project: project?.project_name ?? '',
        company: project?.user.corporate_name ?? '',
        responsible: project?.name ?? '',
        url: import.meta.env.VITE_PROJECT_URL +'/projetos/detalhes/'+project?.id
      });
      toast.success('E-mail enviado ao financeiro com sucesso!');
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`Erro ao enviar email para o financeiro: ${error.response.data.message || 'Erro desconhecido'}`);
      } else {
        toast.error('Erro ao enviar email para o financeiro');
      }
    }
  }

  const { isPending: isPendingMailFinished, mutateAsync: mutateAsyncMailFinished } = useMutation({
    mutationFn: async (data: EmailFinisehdProjectParams) => {
      return mailService.finishedProject(data);
    }
  });

  const { isPending: isPendingChangeFinished, mutateAsync: mutateAsyncChangeFinished } = useMutation({
    mutationFn: async (data: UpdateProjectParams) => {
      return projectsService.update(data);
    }
  });

  async function handleSendMailFinished() {
    try {
      const dateNow = new Date()
      const dateFinished = format(new Date(), `yyyy-MM-dd ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`)

      await mutateAsyncChangeFinished({
        id: idProject!,
        finished: 1,
        finished_date: dateFinished
      })

      await mutateAsyncMailFinished({
        email: project?.user.email ?? '',
        content: project?.technical_information ?? '',
      });
      toast.success('E-mail de conclusão enviado ao cliente com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['editProjeto', idProject] });
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`Erro ao enviar email de conclusão: ${error.response.data.message || 'Erro desconhecido'}`);
      } else {
        toast.error('Erro ao enviar email de conclusão');
      }
    }
  }

  return {
    openPageDetails,
    setIsAddPageOpen,
    handleSubmitPage,
    register,
    onCloseModalPage,
    handleDeletePage,
    handleChangingStatusPage,
    handleDesapprovedPageStatusPage,
    handleInProgressStatusPage,
    handleReviewStatusPage,
    closePageDetails,
    handleEditPage,
    openPageEdit,
    closePageEdit,
    removeFile,
    onOpenModalPage,
    handleSendMailfinance,
    handleSendMailFinished,
    project,
    isAddPageOpen,
    user,
    errors,
    control,
    isLoadingJob,
    jobs: jobsData?.data,
    isPendingJob,
    isLoadingDeleteJob,
    isChangeStatusPage,
    isChecklistComplete,
    areAllPagesApproved,
    isDetailsOpen,
    pageDetailOpen,
    isLoadingEditPage,
    isPendingEditJob,
    pageEditOpen,
    isDeleteFilePage,
    isPendingMailFinance,
    isPendingMailFinished,
    isPendingChangeFinished
  }
}

export function getStatusIcon(status: string | undefined) {
  switch (status) {
    case "approved":
      return <ThumbsUp className="h-4 w-4 text-green-600" />;
    case "approving":
      return <Clock className="h-4 w-4 text-blue-600" />;
    case "changing":
      return <Edit className="h-4 w-4 text-yellow-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-600" />;
  }
}
