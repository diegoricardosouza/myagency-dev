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

  return (
    <Card className="flex flex-col h-full cursor-pointer transition-shadow hover:shadow-md" onClick={onClick}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{project.project_name}</CardTitle>
          <ProjectTypeBadge type={project.type as ProjectType} />
        </div>
        <CardDescription className="!mt-0">{project.user.corporate_name}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Expiração:</span>
            <span className="text-sm">
              {format(new Date(dateEnd), "dd/MM/yyyy", { locale: ptBR })}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Countdown:</span>
            <CountdownProject
              startDate={project.closing_date}
              numberDays={project.calendar_days}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Status:</span>
            {isExpired ? (
              <div className="flex items-center text-red-500 text-sm">
                <AlertTriangle className="h-4 w-4 mr-1" />
                {delay} dias de atraso
              </div>
            ) : (
              <div className="flex items-center text-green-500 text-sm font-normal">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                No prazo
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
