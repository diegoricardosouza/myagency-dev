import { useAuth } from "@/app/hooks/useAuth";
import { projectsService } from "@/app/services/projectsService";
import { calculateDelay } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectType } from "./components/ProjectTypeBadge";

export type ProjectStatus = "no prazo" | "atrasado"

export function useDashboardControllerV2() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<ProjectType | "todos">("todos")
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | "todos">("todos")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const navigate = useNavigate();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects', ],
    staleTime: 0,
    queryFn: async () => {
      const response = await projectsService.getAllNoPagination(false);

      return response;
    },
  });


  // Filtrar e ordenar projetos
  const filteredAndSortedProjects = projects
    ?.data.filter((project) => {
      const d = new Date(project.closing_date)
      const dateEnd = d.setDate(d.getDate() + Number(project.calendar_days))

      const matchesSearch =
        project.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.user.corporate_name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === "todos" || project.type === filterType
      const matchesStatus =
        filterStatus === "todos" ||
        (filterStatus === "atrasado" && calculateDelay(new Date(dateEnd)) > 0) ||
        (filterStatus === "no prazo" && calculateDelay(new Date(dateEnd)) === 0)
      return matchesSearch && matchesType && matchesStatus
    })
    .sort((a, b) => {
      const aa = new Date(a.closing_date)
      const dateEndA = aa.setDate(aa.getDate() + Number(a.calendar_days))
      const bb = new Date(b.closing_date)
      const dateEndB = bb.setDate(bb.getDate() + Number(b.calendar_days))

      const dateA = new Date(dateEndA).getTime()
      const dateB = new Date(dateEndB).getTime()

      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    })

  const clearFilter = (filterName: "type" | "status") => {
    if (filterName === "type") {
      setFilterType("todos")
    } else {
      setFilterStatus("todos")
    }
  }

  const handleCardClick = (projectId: string) => {
    navigate(`/projetos/detalhes/${projectId}`);
  }

  return {
    projects,
    isLoading,
    user,
    filteredAndSortedProjects,
    handleCardClick,
    searchTerm,
    setSearchTerm,
    setFilterType,
    setFilterStatus,
    sortOrder,
    setSortOrder,
    filterType,
    filterStatus,
    clearFilter
  }
}
