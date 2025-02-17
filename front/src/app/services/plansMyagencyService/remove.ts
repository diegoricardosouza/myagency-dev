import { httpClientMyagency } from "../httpClientMyagency";


export async function remove(planId: string) {
  const { data } = await httpClientMyagency.delete(`/plans/${planId}`);

  return data;
}
