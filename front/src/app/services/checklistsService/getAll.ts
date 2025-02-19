import { Checklist } from "@/app/entities/Checklist";
import { httpClient } from "../httpClient";

export interface ChecklistsResponse {
  data: Checklist[]
}

export async function getAll(project?: string) {
  const { data } = await httpClient.get<ChecklistsResponse>('/checklists', {
    params: {
      project
    }
  });

  return data;
}
