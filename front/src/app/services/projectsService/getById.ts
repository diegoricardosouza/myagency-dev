import { Project } from "@/app/entities/Project";
import { httpClient } from "../httpClient";

export interface ProjectResponse {
  data: Project
}

export async function getById(id: string) {
  const { data } = await httpClient.get<ProjectResponse>(`/projects/${id}`);

  return data;
}
