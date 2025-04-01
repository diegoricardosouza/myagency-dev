import { httpClient } from "../httpClient";

export interface EmailFinisehdProjectParams {
  email: string;
  content: string;
}

export async function finishedProject(params: EmailFinisehdProjectParams) {
  const { data } = await httpClient.post('/send-mail-finished', params);

  return data;
}
