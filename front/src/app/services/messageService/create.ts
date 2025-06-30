import { httpClient } from "../httpClient";

export interface MessageParams {
  name: string;
  content: string;
}

export async function create(params: MessageParams) {
  const { data } = await httpClient.post('/messages', params);

  return data;
}
