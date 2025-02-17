import { IPaginateResponse } from "@/app/entities/Pagination";
import { Project } from "@/app/entities/Project";
import { httpClient } from "../httpClient";

export interface ProjectsResponse {
  data: Project[]
}

export async function getAll(page = 1, perPage = 6) {
  const { data } = await httpClient.get<IPaginateResponse<Project[]>>('/projects', {
    params: {
      page,
      per_page: perPage,
    }
  });

  return data;
}
