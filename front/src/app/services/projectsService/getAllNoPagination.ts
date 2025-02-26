import { Project } from "@/app/entities/Project";
import { httpClient } from "../httpClient";

export interface ProjectsResponseNoPagination {
  data: Project[];
}

export async function getAllNoPagination(finished?: string | null | boolean) {
  const { data } = await httpClient.get<ProjectsResponseNoPagination>('/projects-all', {
    params: {
      finished
    }
  });

  return data;
}
