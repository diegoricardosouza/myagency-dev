import { ProjectsDataTable } from "./components/ProjectsDataTable";
import { useProjectController } from "./useProjectController";

export default function Projects() {
  const { projects, isLoadingDelete, isLoading, user } = useProjectController();

  return (
    <ProjectsDataTable
      projects={projects || []}
      user={user!}
      isLoading={isLoadingDelete || isLoading}
    />
  )
}
