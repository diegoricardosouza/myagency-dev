import { User } from "@/app/entities/User";
import { httpClientMyagency } from "../httpClientMyagency";

interface MeResponse {
  data: User
}

export async function me() {
  const { data } = await httpClientMyagency.get<MeResponse>('/users/me');

  return data;
}


