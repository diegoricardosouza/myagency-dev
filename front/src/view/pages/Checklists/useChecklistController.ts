import { checklistsService } from "@/app/services/checklistsService";
import { ChecklistsParams } from "@/app/services/checklistsService/create";
import { UpdateChecklistsParams } from "@/app/services/checklistsService/update";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string()
    .min(1, 'Nome é obrigatório'),
});

type FormData = z.infer<typeof schema>

export function useChecklistController() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [onCloseModal, setOnCloseModal] = useState(false);
  const [onCloseEditModal, setOnCloseEditModal] = useState(false);
  // const [id, setId] = useState('');
  const idChecklist = useRef<string>('');

  const { data: checklistData, isLoading: isLoadingEdit, refetch } = useQuery({
    queryKey: ['editChecklist', idChecklist.current],
    enabled: !!idChecklist.current,
    staleTime: 0,
    queryFn: async () => {
      try {
        const response = await checklistsService.getById(idChecklist.current);
        return response;
      } catch (error) {
        toast.error('Item não encontrado');
        navigate("/configuracoes/checklists");
      }
    }
  });

  const {
      register,
      handleSubmit: hookFormSubmit,
      reset,
      setValue,
      formState: { errors }
    } = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
        name: checklistData?.data.name
      }
    });

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['checklists'],
    staleTime: 0,
    queryFn: async () => {
      const response = await checklistsService.getAll();

      return response;
    },
  });

  useEffect(() => {
    if (checklistData) {
      setValue('name', checklistData.data.name)
    }
    if (idChecklist.current && onCloseEditModal) {
      refetch();
    }
  }, [checklistData, onCloseEditModal, refetch, setValue]);

  const {
    isPending: isLoadingDelete,
    mutateAsync: removeChecklist
  } = useMutation({
    mutationFn: async (id: string) => {
      return checklistsService.remove(id);
    }
  });

  async function handleDeleteItem(id: string) {
    try {
      await removeChecklist(id);

      queryClient.invalidateQueries({ queryKey: ['checklists'] });
      toast.success('O checklist foi deletado com sucesso!');
    } catch {
      toast.error('Erro ao deletar o checklist!');
    }
  }

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: ChecklistsParams) => {
      return checklistsService.create(data);
    }
  });

  const { isPending: isPendingUpdate , mutateAsync: mutateAsyncUpdate } = useMutation({
    mutationFn: async (data: UpdateChecklistsParams) => {
      return checklistsService.update(data);
    }
  });

  function openNewAccountModal() {
    setOnCloseModal(true);
    setValue('name', '');
  }

  function closeNewAccountModal() {
    setOnCloseModal(false);
  }

  function openEditAccountModal(id: string) {
    // setId(id);
    idChecklist.current = id;
    setOnCloseEditModal(true);
  }

  function closeEditAccountModal() {
    setOnCloseEditModal(false);
    reset();
  }

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        active: false
      });

      queryClient.invalidateQueries({ queryKey: ['checklists'] });
      toast.success('Checklist cadastrado com sucesso!');
      reset();
      closeNewAccountModal();
    } catch (error) {
      toast.error('Erro ao cadastrar o plano');
    }
  });

  const handleSubmitUpdate = hookFormSubmit(async (data) => {
    try {
      await mutateAsyncUpdate({
        ...data,
        id: idChecklist.current,
        active: false
      });

      queryClient.invalidateQueries({ queryKey: ['checklists'] });
      toast.success('Checklist atualizado com sucesso!');
      reset();
      closeEditAccountModal();
    } catch (error) {
      toast.error('Erro ao cadastrar o plano');
    }
  });

  return {
    checklists: data?.data,
    isFetching,
    handleDeleteItem,
    isLoadingDelete,
    isLoading,
    register,
    errors,
    isPending,
    handleSubmit,
    handleSubmitUpdate,
    onCloseModal,
    closeNewAccountModal,
    openNewAccountModal,
    openEditAccountModal,
    closeEditAccountModal,
    onCloseEditModal,
    isPendingUpdate,
    isLoadingEdit
  };
}
