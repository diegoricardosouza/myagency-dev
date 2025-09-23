import { httpClient } from "../httpClient";


export async function remove(planId: string) {
  const { data } = await httpClient.delete(`/comments/${planId}`);

  return data;
}
