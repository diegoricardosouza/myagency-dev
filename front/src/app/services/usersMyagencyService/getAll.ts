import { IPaginateResponse } from "@/app/entities/Pagination";
import { User } from "@/app/entities/User";
import { httpClientMyagency } from "../httpClientMyagency";

export interface UsersResponse {
  data: User[]
}

export async function getAll(page = 1, perPage = 6) {
  const { data } = await httpClientMyagency.get<IPaginateResponse<User[]>>('/users', {
    params: {
      page,
      per_page: perPage,
    }
  });

  return data;
}
