import { LevelProps, STATUS_PROJECT } from "@/app/config/constants";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/view/components/ui/select";
import { ChartNoAxesColumn, Loader2 } from "lucide-react";
import { Controller } from "react-hook-form";
import { useStatusProjectController } from "./useStatusController";

interface StatusProps {
  status?: string;
}

export function Status({ status }: StatusProps) {
  const { control, errors, isLoading, handleSubmit } = useStatusProjectController(status);

  return (
    <Card className="md:col-span-2">
      <CardContent className="pt-6">
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <ChartNoAxesColumn className="h-4 w-4 mr-1" />
          Status
        </h3>

        <form
          onSubmit={handleSubmit}
        >
          <div className="flex gap-4">
            <div className="grid gap-2 flex-1">
              <Controller
                control={control}
                name="status"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <Select
                    onValueChange={onChange}
                    value={value}
                  >
                    <SelectTrigger
                      id="state"
                      aria-label="Selecione o status"
                    >
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_PROJECT.map((level: LevelProps) => (
                        <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                      ))}
                    </SelectContent>

                    {errors?.status?.message && (
                      <div className="flex gap-2 items-center text-red-700">
                        <span className="text-xs">{errors?.status?.message}</span>
                      </div>
                    )}
                  </Select>
                )}
              />
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Mudar Status
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
