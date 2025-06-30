import { httpClient } from "../httpClient";


export async function remove(planId: string) {
  const { data } = await httpClient.delete(`/messages/${planId}`);

  return data;
}
