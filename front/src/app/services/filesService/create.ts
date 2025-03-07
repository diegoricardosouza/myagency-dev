import { httpClient } from "../httpClient";

export interface PlanParams {
  name: string;
  quantity: string;
  price: string;
}

export async function create(params: PlanParams) {
  const { data } = await httpClient.post('/plans', params);

  return data;
}
