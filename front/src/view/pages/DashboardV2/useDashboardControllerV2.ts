import { projectsService } from "@/app/services/projectsService";
import { useQuery } from "@tanstack/react-query";

export function useDashboardControllerV2() {
  const { data, isLoading } = useQuery({
    queryKey: ['projects', ],
    staleTime: 0,
    queryFn: async () => {
      const response = await projectsService.getAllNoPagination(false);

      return response;
    },
  });

  return {
    projects: data?.data,
    isLoading
  }
}
