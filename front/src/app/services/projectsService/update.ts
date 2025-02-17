import { Project } from "@/app/entities/Project";
import { httpClient } from "../httpClient";

export interface UpdateProjectParams extends Project {}

export async function update({ id, ...params }: UpdateProjectParams) {
  const { data } = await httpClient.patch(`/projects/${id}`, params);

  return data;
}
