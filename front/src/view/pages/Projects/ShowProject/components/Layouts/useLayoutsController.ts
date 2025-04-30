import { projectsService } from "@/app/services/projectsService";
import { UpdateProjectParams } from "@/app/services/projectsService/update";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  layouts: z.string()
    .min(1, 'Layouts é obrigatório'),
});

type FormData = z.infer<typeof schema>

export function useLayoutsController() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [openModalTech, setOpenModalTech] = useState(false);

  const {
    control,
    setValue,
    handleSubmit: hookFormSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { data: techData } = useQuery({
    queryKey: ['editProjeto', id],
    enabled: !!id,
    staleTime: 0,
    queryFn: async () => {
      try {
        const response = await projectsService.getById(id!);
        return response;
      } catch (error) {
        toast.error('Item não encontrado');
        closeModal();
      }
    }
  });

  useEffect(() => {
    if (techData) {
      setValue('layouts', techData.data.layouts)
    }
  }, [setValue, techData]);

  function openModal() {
    setOpenModalTech(true);
  }

  function closeModal() {
    setOpenModalTech(false);
    queryClient.invalidateQueries({ queryKey: ['editProjeto', id] });
  }

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: UpdateProjectParams) => {
      return projectsService.update(data);
    }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      if (id) {
        await mutateAsync({
          layouts: data.layouts,
          id
        });
      }

      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Projeto atualizado com sucesso!');
      closeModal();
    } catch (error) {
      toast.error('Erro ao atualizar o projeto');
    }
  });

  return {
    handleSubmit,
    openModal,
    closeModal,
    errors,
    control,
    isPending,
    openModalTech
  }
}
