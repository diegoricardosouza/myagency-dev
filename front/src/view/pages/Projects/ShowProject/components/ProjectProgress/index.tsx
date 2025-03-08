import { Jobs } from "@/app/entities/Jobs";
import { Card, CardContent } from "@/view/components/ui/card";
import { Progress } from "@/view/components/ui/progress";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface ProjectProgressProps {
  closeDate?: string;
  numberDays?: string;
  pages?: Jobs[];
}

export function ProjectProgress({ closeDate, numberDays, pages }: ProjectProgressProps) {
  const [startDateIni, setStartDateIni] = useState<string | null>(null);

  useEffect(() => {
    if (closeDate) {
      setStartDateIni(closeDate);
    }
  }, [closeDate]);

  const startDate = new Date(startDateIni!);
  const numDays = Number(numberDays) || 0;
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + numDays);

  const pagesApproved = pages?.filter((page) => page.status === "approved").length
  const totalPages = pages?.length

  const percentage = Math.round((pagesApproved! / totalPages!) * 100)

  return (
    <Card className="md:col-span-2">
      <CardContent className="pt-6">
        <div className="mb-2">
          <div>
            <p className="text-sm text-muted-foreground">Progresso do Projeto</p>
            <p className="text-lg font-medium">{percentage > 0 ? percentage : 0}% Concluído</p>
          </div>
        </div>

        <Progress value={percentage > 0 ? percentage : 0} className="h-2" />

        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Início: {format(startDate, 'dd/MM/yyyy')}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Prazo: {format(endDate, 'dd/MM/yyyy')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
