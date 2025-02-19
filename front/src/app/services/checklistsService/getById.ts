import { Checklist } from "@/app/entities/Checklist";
import { httpClient } from "../httpClient";

export interface ChecklistsResponse {
  data: Checklist
}

export async function getById(id: string) {
  const { data } = await httpClient.get<ChecklistsResponse>(`/checklists/${id}`);

  return data;
}
