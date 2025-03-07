import { httpClient } from "../httpClient";

export interface JobParams {
  site?: string | null | undefined;
  page?: string | null | undefined;
  format?: string | null | undefined;
  other_formats?: string | null | undefined;
  phrase?: string | null | undefined;
  content: string;
  obs?: string | null | undefined;
  type?: string | null | undefined;
  files?: File[] | null | undefined;
  project_id?: string | null | undefined;
}

export async function create(params: JobParams) {
  const { data } = await httpClient.post('/jobs', params, { headers: { "Content-Type": "multipart/form-data" } });

  return data;
}
