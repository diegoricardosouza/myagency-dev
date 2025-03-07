import { Plan } from "@/app/entities/Plan";
import { httpClient } from "../httpClient";

export interface PlansResponse {
  data: Plan[]
}

export async function getAll() {
  const { data } = await httpClient.get<PlansResponse>('/plans');

  return data;
}
