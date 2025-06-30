import { Message } from "@/app/entities/Message";
import { httpClient } from "../httpClient";

export interface MessageResponse {
  data: Message[]
}

export async function getAll() {
  const { data } = await httpClient.get<MessageResponse>('/messages');

  return data;
}
