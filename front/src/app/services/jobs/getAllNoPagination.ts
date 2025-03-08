import { Jobs } from "@/app/entities/Jobs";
import { httpClient } from "../httpClient";

export interface JobsResponse {
  data: Jobs[];
}

export async function getAllNoPagination(project_id?: string, startDate?: string, endDate?: string, type?: string, excludeType?: string) {
  const { data } = await httpClient.get<JobsResponse>('/jobs-all', {
    params: {
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      type: type || undefined,
      excludeType: excludeType || undefined,
      project_id
    },
  });

  return data;
}
