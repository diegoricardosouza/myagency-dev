import { Project } from "@/app/entities/Project"
import { calculateDelay } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/view/components/ui/card"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
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
      <CardHeader>
        <div className="flex justify-between items-start gap-[10px]">
          <CardTitle className="text-lg flex-1 leading-[20px]">{project.project_name}</CardTitle>
          <ProjectTypeBadge type={project.type as ProjectType} />
        </div>
        <CardDescription >{project.user.corporate_name}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          {!finished && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Expiração:</span>
              <span className="text-sm">
                {format(new Date(dateEnd), "dd/MM/yyyy", { locale: ptBR })}
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
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Finalizado
              </div>
            )}

            {!finished && (
              isExpired ? (
                <div className="flex items-center text-red-500 text-sm">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  {delay} dias de atraso
                </div>
              ) : (
                <div className="flex items-center text-green-500 text-sm font-normal">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
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
