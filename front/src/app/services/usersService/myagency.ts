import { UserMyAgency } from "@/app/entities/UserMyAgency";
import { httpClientMyagency } from "../httpClientMyagency";

interface MeResponse {
  data: UserMyAgency
}

export async function myagency() {
  const { data } = await httpClientMyagency.get<MeResponse>('/users/me');

  return data;
}


