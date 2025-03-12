import { User } from "@/app/entities/User";
import { httpClientArts } from "../httpClientArts";

interface MeResponse {
  data: User
}

export async function me() {
  const { data } = await httpClientArts.get<MeResponse>('/users/me');

  return data;
}


