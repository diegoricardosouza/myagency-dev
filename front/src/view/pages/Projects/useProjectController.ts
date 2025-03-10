import { useAuth } from "@/app/hooks/useAuth";
import { projectsService } from "@/app/services/projectsService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useProjectController() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['projects'],
    staleTime: 0,
    queryFn: async () => {
      const response = await projectsService.getAllNoPagination();

      return response;
    },
  });

  const {
    isPending: isLoadingDelete,
    mutateAsync: removeUser
  } = useMutation({
    mutationFn: async (id: string) => {
      return projectsService.remove(id);
    }
  });

  async function handleDeleteUser(id: string) {
    try {
      await removeUser(id);

      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Projeto deletado com sucesso!');
    } catch {
      toast.error('Erro ao deletar o projeto!');
    }
  }

  return {
    projects: data?.data,
    isFetching,
    handleDeleteUser,
    isLoadingDelete,
    isLoading,
    user
  };
}
