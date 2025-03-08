import { Checklist } from "@/app/entities/Checklist";
import { checklistsService } from "@/app/services/checklistsService";
import { ChecklistsParams } from "@/app/services/checklistsService/create";
import { UpdateChecklistsParams } from "@/app/services/checklistsService/update";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string()
    .min(1, 'Nome é obrigatório'),
});

type FormData = z.infer<typeof schema>

export function useChecklistShowProjectController() {
  const [localChecklist, setLocalChecklist] = useState<Checklist[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isCloseEditModal, setIsCloseEditModal] = useState(false);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const idChecklist = useRef<string>('');

  const { data: checklistEditData, isLoading: isLoadingEdit, refetch } = useQuery({
    queryKey: ['editChecklist', idChecklist.current],
    enabled: !!idChecklist.current,
    staleTime: 0,
    queryFn: async () => {
      try {
        const response = await checklistsService.getById(idChecklist.current as string);
        return response;
      } catch (error) {
        toast.error('Item não encontrado');
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
      name: checklistEditData?.data.name
    }
  });

  useEffect(() => {
    if (checklistEditData) {
      setValue('name', checklistEditData?.data.name)
    }
    if (idChecklist.current && isCloseEditModal) {
      refetch();
    }
  }, [checklistEditData, isCloseEditModal, refetch, setValue]);

  const { data: dataChecklist, isFetching: isFetchingChecklist } = useQuery({
    queryKey: ['checklists', id],
    staleTime: 0,
    queryFn: async () => {
      const response = await checklistsService.getAll(id);
      return response;
    },
  });

  useEffect(() => {
    if (dataChecklist?.data) {
      setLocalChecklist(dataChecklist.data);
    }
  }, [dataChecklist]);

  const { mutateAsync: mutateAsyncChecklistUpdate } = useMutation({
    mutationFn: async (data: UpdateChecklistsParams) => {
      return checklistsService.update(data);
    }
  });

  function openModal() {
    setIsOpenModal(true);
    setValue('name', '');
  }

  function closeModal() {
    setIsOpenModal(false);
  }

  function openEditModal(id: string) {
    idChecklist.current = id;
    setIsCloseEditModal(true);
  }

  function closeEditModal() {
    setIsCloseEditModal(false);
    reset();
  }

  const handleChecklistChange = async (itemId: string, currentActive: boolean, name: string) => {
    try {
      const newActiveState = !currentActive;

      setLocalChecklist(prev =>
        prev.map(item =>
          item.id === itemId
            ? { ...item, active: newActiveState }
            : item
        )
      );

      await mutateAsyncChecklistUpdate({
        id: itemId,
        active: newActiveState,
        name
      });

      queryClient.invalidateQueries({ queryKey: ['checklists'] });
      queryClient.invalidateQueries({ queryKey: ['editProjeto'] });

    } catch (error) {
      console.error("Erro ao atualizar checklist:", error);

      setLocalChecklist(prev =>
        prev.map(item =>
          item.id === itemId
            ? { ...item, active: currentActive }
            : item
        )
      );
    }
  };

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
      queryClient.invalidateQueries({ queryKey: ['editProjeto'] });
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

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        active: false,
        project_id: id
      });

      queryClient.invalidateQueries({ queryKey: ['checklists'] });
      queryClient.invalidateQueries({ queryKey: ['editProjeto'] });
      toast.success('Checklist cadastrado com sucesso!');
      reset();
      closeModal();
    } catch (error) {
      toast.error('Erro ao cadastrar o plano');
    }
  });

  const { isPending: isPendingUpdate, mutateAsync: mutateAsyncUpdate } = useMutation({
    mutationFn: async (data: UpdateChecklistsParams) => {
      return checklistsService.update(data);
    }
  });

  const handleSubmitUpdate = hookFormSubmit(async (data) => {
    try {
      // console.log(data, checklistEditData?.data.active);

      await mutateAsyncUpdate({
        ...data,
        id: idChecklist.current,
        active: checklistEditData?.data.active
      });

      queryClient.invalidateQueries({ queryKey: ['checklists'] });
      toast.success('Checklist atualizado com sucesso!');
      reset();
      closeEditModal();
    } catch (error) {
      toast.error('Erro ao cadastrar o plano');
    }
  });

  return {
    checklist: localChecklist,
    handleChecklistChange,
    isFetchingChecklist,
    isOpenModal,
    openModal,
    closeModal,
    register,
    handleSubmit,
    errors,
    isLoadingDelete,
    handleDeleteItem,
    isPending,
    openEditModal,
    closeEditModal,
    isCloseEditModal,
    isLoadingEdit,
    handleSubmitUpdate,
    isPendingUpdate
  }
}
