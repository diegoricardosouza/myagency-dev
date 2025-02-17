import { Plan } from "@/app/entities/Plan";
import { httpClientMyagency } from "../httpClientMyagency";

export interface PlanResponse {
  data: Plan
}

export async function getById(id: string) {
  const { data } = await httpClientMyagency.get<PlanResponse>(`/plans/${id}`);

  return data;
}
