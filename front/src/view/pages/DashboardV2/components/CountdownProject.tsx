import Countdown from "react-countdown";

interface CountdownProjectProps {
  startDate: string;
  numberDays: string;
}

type RendererProp = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

export function CountdownProject({ numberDays, startDate }: CountdownProjectProps) {
  const d = new Date(startDate)
  const dateEnd = d.setDate(d.getDate() + Number(numberDays))

  const renderer = ({ days, hours, minutes, seconds, completed }: RendererProp) => {
    return (
      <>
        {!completed && (
          <div className="font-mono text-gray-950 text-lg font-semibold">
            {days}d {hours}h {minutes}m {seconds}s
          </div>
        )}

        {completed && (
          <div className="font-mono text-red-500 text-lg font-semibold">
            Expirado
          </div>
        )}
      </>
    )
  }

  return (
    <Countdown renderer={renderer} date={dateEnd} />
  )
}
