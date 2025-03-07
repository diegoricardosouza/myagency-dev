import { Plan } from "@/app/entities/Plan";
import { httpClient } from "../httpClient";

export interface PlanResponse {
  data: Plan
}

export async function getById(id: string) {
  const { data } = await httpClient.get<PlanResponse>(`/plans/${id}`);

  return data;
}
