import { httpClient } from "../httpClient";

export interface SendWhatsAppParams {
  phone?: string | undefined;
  message: string;
}

export async function sendComment(params: SendWhatsAppParams) {
  const { data } = await httpClient.post('/send-whatsapp', params);

  return data;
}
