import { User } from "@/app/entities/User";
import { differenceInDays, format } from "date-fns";
import { ptBR } from 'date-fns/locale/pt-BR';
import { AlarmClock } from "lucide-react";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

interface CountdownCardProps {
  id: string;
  title: string;
  user: User;
  calendar_days: string | number
  type: string;
  date: string | number | Date
}

type RendererProp = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

export function CountdownCard({ id, title, date, calendar_days, type, user }: CountdownCardProps) {
  const d = new Date(date)
  const dateEnd = d.setDate(d.getDate() + Number(calendar_days))
  const diferencaEmDias = differenceInDays(new Date(), new Date(dateEnd));

  const renderer = ({ days, hours, minutes, seconds, completed }: RendererProp) => {
    return (
      <Card className="shadow-lg">
        <Link to={`/projetos/detalhes/${id}`} className="flex flex-col justify-between p-4 lg:p-6 w-full h-full">
          <div className="flex flex-col gap-6">
            <div>
              <div className="text-xl font-semibold">{title}</div>

              <span className="text-[13px] leading-[18px] text-muted-foreground block mb-4">
                {user.corporate_name}<br />
              </span>

              <div className="flex gap-2">
                <Badge className="bg-yellow-100 text-gray-800 hover:bg-yellow-100 capitalize font-normal">
                  {format(dateEnd, 'dd MMM yyyy', {
                    locale: ptBR
                  })}
                </Badge>
                <Badge className="font-normal">{type}</Badge>
              </div>
            </div>
            {!completed && (
              <div className="flex justify-between items-center">
                {/* <div className="border px-2 py-4 rounded-lg shadow-lg min-w-[70px]"> */}
                <div>
                  <div className="text-xl font-bold text-center">{days}</div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 text-center font-light">Dias</div>
                </div>

                <div className="w-[2px] h-[15px] bg-[#e2e8f0]" />

                <div>
                  <div className="text-xl font-bold text-center">{hours}</div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 text-center font-light">Horas</div>
                </div>

                <div className="w-[2px] h-[15px] bg-[#e2e8f0]" />

                <div>
                  <div className="text-xl font-bold text-center">{minutes}</div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 text-center font-light">Minutos</div>
                </div>

                <div className="w-[2px] h-[15px] bg-[#e2e8f0]" />

                <div>
                  <div className="text-xl font-bold text-center">{seconds}</div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 text-center font-light">Segundos</div>
                </div>
              </div>
            )}
          </div>

          {completed && (
            <div className="mt-4 lg:mt-2 text-center">
              <Badge variant="destructive" className="font-normal">
                <AlarmClock className="w-4 mr-1" />
                {diferencaEmDias} dias de atraso
              </Badge>
            </div>
          )}
        </Link>
      </Card>
    );
  };

  return (
    <Countdown renderer={renderer} date={dateEnd} />
  )
}
