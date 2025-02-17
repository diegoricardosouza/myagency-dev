import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface DatePickerProps {
  value: Date;
  onChange?(date: Date): void;
  label?: string;
  className?: string;
  classNameText?: string;
}

export function DataPicker({ value, onChange, label, className, classNameText }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date())

  function handleChangeDate(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  return (
    <>
      <span
        className={
          cn(
            'block text-sm text-muted-foreground mb-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            classNameText
          )
        }
      >
        {label}
      </span>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full min-w-[240px] pl-3 text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            {value ? (
              format(value, "dd/MM/yyyy")
            ) : (
              <span>{label}</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            value={selectedDate}
            onChange={handleChangeDate}
            className={className}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
