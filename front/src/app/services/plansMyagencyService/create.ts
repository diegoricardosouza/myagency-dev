import { httpClientMyagency } from "../httpClientMyagency";

export interface PlanParams {
  name: string;
  updates: number;
  digital_midia: number;
  printed: number;
  presentations: number;
  videos: number;
}

export async function create(params: PlanParams) {
  const { data } = await httpClientMyagency.post('/plans', params);

  return data;
}
