import { httpClientMyagency } from "../httpClientMyagency";

export interface UpdatePlanParams {
  id: string;
  name: string;
  updates: string;
  digital_midia: string;
  printed: string;
  presentations: string;
  videos: string;
}

export async function update({ id, ...params }: UpdatePlanParams) {
  const { data } = await httpClientMyagency.patch(`/plans/${id}`, params);

  return data;
}
