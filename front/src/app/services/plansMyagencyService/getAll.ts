import { Plan } from "@/app/entities/Plan";
import { httpClientMyagency } from "../httpClientMyagency";

export interface PlansResponse {
  data: Plan[]
}

export async function getAll() {
  const { data } = await httpClientMyagency.get<PlansResponse>('/plans');

  return data;
}
