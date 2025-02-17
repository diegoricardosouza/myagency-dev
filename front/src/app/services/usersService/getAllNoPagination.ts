import { User } from "@/app/entities/User";
import { httpClient } from "../httpClient";

export interface UsersResponseNoPagination {
  data: User[];
}

export async function getAllNoPagination() {
  const { data } = await httpClient.get<UsersResponseNoPagination>('/users-all');

  return data;
}
