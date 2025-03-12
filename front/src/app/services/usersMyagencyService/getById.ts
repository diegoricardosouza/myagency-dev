import { User } from "@/app/entities/User";
import { httpClientMyagency } from "../httpClientMyagency";

export interface UserResponse {
  data: User
}

export async function getById(id: string) {
  const { data } = await httpClientMyagency.get<UserResponse>(`/users/${id}`);

  return data;
}
