import { httpClient } from "../httpClient";

export interface UpdateCommentParams {
  id: string;
  content: string;
  job_id: string;
  user_id: string;
  files?: File[] | null | undefined;
}

export async function update({ id, ...params }: UpdateCommentParams) {
  const { data } = await httpClient.post(`/comments/${id}`, params, { headers: { "Content-Type": "multipart/form-data" } });

  return data;
}
