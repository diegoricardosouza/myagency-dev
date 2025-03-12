import { User } from "@/app/entities/User";
import { httpClientArts } from "../httpClientArts";

export interface UserResponse {
  data: User
}

export async function getById(id: string) {
  const { data } = await httpClientArts.get<UserResponse>(`/users/${id}`);

  return data;
}
