import { User } from "@/app/entities/User";
import { httpClientMyagency } from "../httpClientMyagency";

export interface UsersResponseNoPagination {
  data: User[];
}

export async function getAllNoPagination() {
  const { data } = await httpClientMyagency.get<UsersResponseNoPagination>('/users-all');

  return data;
}
