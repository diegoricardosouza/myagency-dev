import { Project } from "@/app/entities/Project"
import { calculateDelay } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/view/components/ui/card"
import { format } from "date-fns"
import { AlertTriangle, CheckCircle2 } from "lucide-react"
import { CountdownProject } from "./CountdownProject"
import { ProjectType, ProjectTypeBadge } from "./ProjectTypeBadge"

interface ProjectCardProps {
  project: Project;
  onClick: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const d = new Date(project.closing_date)
  const dateEnd = d.setDate(d.getDate() + Number(project.calendar_days))

  const delay = calculateDelay(new Date(dateEnd))
  const isExpired = delay > 0

  const finished = !!project.finished

  return (
    <Card className="flex flex-col h-full cursor-pointer transition-shadow hover:shadow-md" onClick={onClick}>
      <CardHeader className="px-4 pt-4 space-y-0">
        <div className="flex flex-col justify-between items-start gap-[10px]">
          <div className="flex justify-end w-full">
            <ProjectTypeBadge type={project.type as ProjectType} />
          </div>
          <CardTitle className="text-[16px] flex-1 leading-[18px]">{project.project_name}</CardTitle>
        </div>
        <CardDescription className="text-[13px]">{project.user.corporate_name}</CardDescription>
      </CardHeader>

      <CardContent className="flex-grow px-4 pb-4">
        <div className="space-y-0">
          {!finished && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Expiração:</span>
              <span className="text-sm">
                {format(new Date(dateEnd), "dd/MM/yyyy")}
              </span>
            </div>
          )}

          {finished ? (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Concluído em :</span>
              <span className="text-sm">{format(project.finished_date!, "dd/MM/yyyy")}</span>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Expira em :</span>
              <CountdownProject
                startDate={project.closing_date}
                numberDays={project.calendar_days}
              />
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Status:</span>
            {finished && (
              <div className="flex items-center text-green-500 text-sm font-normal">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                Finalizado
              </div>
            )}

            {!finished && (
              isExpired ? (
                <div className="flex items-center text-red-500 text-sm">
                  <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                  {delay} dias de atraso
                </div>
              ) : (
                <div className="flex items-center text-green-500 text-sm font-normal">
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                  No prazo
                </div>
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
