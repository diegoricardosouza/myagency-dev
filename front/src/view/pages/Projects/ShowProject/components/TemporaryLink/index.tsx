import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";
import { Input } from "@/view/components/ui/input";
import { Clock, ExternalLink, Link2 } from "lucide-react";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";

interface TemporaryLinkProps {
  temporaryLink?: string;
  closeDate?: string;
  numberDays?: string;
}

type RendererProp = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

export function TemporaryLink({ temporaryLink, closeDate, numberDays }: TemporaryLinkProps) {
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

  const renderer = ({ days, hours, minutes, seconds, completed }: RendererProp) => {
    return (
      <>
        {!completed && (
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Tempo Restante
            </h3>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-muted p-2 rounded-md">
                <p className="text-xl font-bold">{days}</p>
                <p className="text-xs text-muted-foreground">Dias</p>
              </div>
              <div className="bg-muted p-2 rounded-md">
                <p className="text-xl font-bold">{hours}</p>
                <p className="text-xs text-muted-foreground">Horas</p>
              </div>
              <div className="bg-muted p-2 rounded-md">
                <p className="text-xl font-bold">{minutes}</p>
                <p className="text-xs text-muted-foreground">Min</p>
              </div>
              <div className="bg-muted p-2 rounded-md">
                <p className="text-xl font-bold">{seconds}</p>
                <p className="text-xs text-muted-foreground">Seg</p>
              </div>
            </div>
          </div>
        )}

        {completed && (
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Tempo Restante
            </h3>
            <div className="font-mono text-red-500 text-lg font-semibold">
              Expirado
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Link2 className="h-4 w-4 mr-1" />
              Link Temporário
            </h3>
            <div className="flex items-center gap-2">
              <Input value={temporaryLink || ""} readOnly className="text-xs read-only:bg-white" />
              <Button size="icon" variant="ghost" onClick={() => window.open(temporaryLink, "_blank")}>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {startDateIni && (
            <Countdown key={startDateIni} renderer={renderer} date={endDate} />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
