import { Comments } from "@/app/entities/Comments";
import { httpClient } from "../httpClient";

export interface CommentResponse {
  data: Comments
}

export async function getById(id: string) {
  const { data } = await httpClient.get<CommentResponse>(`/comments/${id}`);

  return data;
}
