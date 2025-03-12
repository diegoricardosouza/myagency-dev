import { IPaginateResponse } from "@/app/entities/Pagination";
import { User } from "@/app/entities/User";
import { httpClientArts } from "../httpClientArts";

export interface UsersResponse {
  data: User[]
}

export async function getAll(page = 1, perPage = 6) {
  const { data } = await httpClientArts.get<IPaginateResponse<User[]>>('/users', {
    params: {
      page,
      per_page: perPage,
    }
  });

  return data;
}
