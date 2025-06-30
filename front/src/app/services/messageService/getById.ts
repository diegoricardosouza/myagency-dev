import { Message } from "@/app/entities/Message";
import { httpClient } from "../httpClient";

export interface MessageResponse {
  data: Message
}

export async function getById(id: string) {
  const { data } = await httpClient.get<MessageResponse>(`/messages/${id}`);

  return data;
}
