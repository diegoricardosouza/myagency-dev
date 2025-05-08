import { projectsService } from "@/app/services/projectsService";
import { UpdateProjectParams } from "@/app/services/projectsService/update";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  status: z.string()
    .min(1, 'Status é obrigatório'),
});

type FormData = z.infer<typeof schema>

export function useStatusProjectController(status?: string) {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const {
    control,
    setValue,
    handleSubmit: hookFormSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: ""
    }
  });

  useEffect(() => {
    if (status !== undefined) {
      setValue("status", status);
    }
  }, [setValue, status]);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: UpdateProjectParams) => {
      return projectsService.update(data);
    }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      if (id) {
        await mutateAsync({
          id,
          status: data.status
        });
      }

      queryClient.invalidateQueries({ queryKey: ['editProjeto'] });
      toast.success('Status do Projeto atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar o projeto');
    }
  });

  return {
    control,
    errors,
    handleSubmit,
    isLoading: isPending
  }
}
