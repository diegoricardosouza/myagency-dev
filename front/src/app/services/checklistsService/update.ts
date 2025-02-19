import { Checklist } from "@/app/entities/Checklist";
import { httpClient } from "../httpClient";

export interface UpdateChecklistsParams extends Checklist {}

export async function update({ id, ...params }: UpdateChecklistsParams) {
  const { data } = await httpClient.patch(`/checklists/${id}`, params);

  return data;
}
