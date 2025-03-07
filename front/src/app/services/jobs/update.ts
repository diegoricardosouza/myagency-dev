import { httpClient } from "../httpClient";

export interface UpdateJobParams {
  id: string;
  page?: string | null | undefined;
  content?: string | null | undefined;
  status?: string;
  files?: File[] | null | undefined;
}

export async function update({ id, ...params }: UpdateJobParams) {
  const { data } = await httpClient.post(`/jobs/${id}`, params, { headers: { "Content-Type": "multipart/form-data" } });

  return data;
}
