import { httpClient } from "../httpClient";

export interface ChecklistsParams {
  name: string;
  active: boolean;
}

export async function create(params: ChecklistsParams) {
  const { data } = await httpClient.post('/checklists', params);

  return data;
}
