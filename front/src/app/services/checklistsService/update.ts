import { httpClient } from "../httpClient";

export interface UpdateChecklistsParams {
  id: string;
  name?: string;
  active?: boolean;
  project_id?: string;
}

export async function update({ id, ...params }: UpdateChecklistsParams) {
  const { data } = await httpClient.patch(`/checklists/${id}`, params);

  return data;
}
