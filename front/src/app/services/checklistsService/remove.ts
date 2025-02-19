import { httpClient } from "../httpClient";


export async function remove(planId: string) {
  const { data } = await httpClient.delete(`/checklists/${planId}`);

  return data;
}
