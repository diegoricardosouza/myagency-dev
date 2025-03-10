import { useAuth } from "@/app/hooks/useAuth";
import { usersService } from "@/app/services/usersService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUserController() {
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['users'],
    staleTime: 0,
    queryFn: async () => {
      const response = await usersService.getAllNoPagination();

      return response;
    },
  });

  const {
    isPending: isLoadingDelete,
    mutateAsync: removeUser
  } = useMutation({
    mutationFn: async (id: string) => {
      return usersService.remove(id);
    }
  });

  async function handleDeleteUser(id: string) {
    try {
      await removeUser(id);

      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('A usuário foi deletado com sucesso!');
    } catch {
      toast.error('Erro ao deletar o usuário!');
    }
  }

  return {
    users: data?.data,
    isFetching,
    handleDeleteUser,
    isLoadingDelete,
    isLoading,
    user
  };
}
