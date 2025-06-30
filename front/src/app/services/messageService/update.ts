import { httpClient } from "../httpClient";

export interface UpdateMessageParams {
  id: string;
  name: string;
  content?: string | null;
}

export async function update({ id, ...params }: UpdateMessageParams) {
  const { data } = await httpClient.patch(`/messages/${id}`, params);

  return data;
}
