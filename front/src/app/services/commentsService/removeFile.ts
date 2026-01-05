import { httpClient } from "../httpClient";


export async function removeFile(planId: string) {
  const { data } = await httpClient.delete(`/files-comments/${planId}`);

  return data;
}
