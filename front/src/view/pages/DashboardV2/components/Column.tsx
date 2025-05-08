import { LevelProps } from "@/app/config/constants";
import { Project } from "@/app/entities/Project";
import { useNavigate } from "react-router-dom";
import { ProjectCard } from "./ProjectCard";

interface Columnprops {
  status: LevelProps;
  projects: Project[];
}

export function Column({ status, projects }: Columnprops) {
  const navigate = useNavigate();

  const handleCardClick = (projectId: string) => {
    navigate(`/projetos/detalhes/${projectId}`);
  }

  return (
    <div>
      <div className={`flex-shrink-0 w-80 lg:w-80 bg-slate-200 rounded-lg shadow transition-colors duration-200`}>
        <div className="p-3 font-medium flex justify-between items-center border-b border-slate-300">
          <h2 className="text-[15px]">
            {status.label} <span className="ml-2 text-[13px] text-slate-500">({projects.length})</span>
          </h2>
        </div>

        <div className="p-2 flex flex-col gap-2 min-h-[calc(100vh-243px)] max-h-[calc(100vh-243px)] 2xl:min-h-[calc(100vh-258px)] 2xl:max-h-[calc(100vh-258px)] overflow-y-auto">
          {projects?.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={() => handleCardClick(project.id)} />
          ))}
        </div>
      </div>
    </div>
  )
}
