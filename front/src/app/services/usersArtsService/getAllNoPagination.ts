import { User } from "@/app/entities/User";
import { httpClientArts } from "../httpClientArts";

export interface UsersResponseNoPagination {
  data: User[];
}

export async function getAllNoPagination() {
  const { data } = await httpClientArts.get<UsersResponseNoPagination>('/users-all');

  return data;
}
