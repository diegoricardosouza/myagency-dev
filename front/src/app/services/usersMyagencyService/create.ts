import { httpClientMyagency } from "../httpClientMyagency";

export interface UserMyAgencyParams {
  name?: string;
  company?: string;
  responsible?: string;
  email: string;
  level: string;
  whatsapp: string;
  day: number;
  plan_id: string;
  password: string;
  logo: string | null;
}

export async function create(params: UserMyAgencyParams) {
  const { data } = await httpClientMyagency.post('/users', params, { headers: { "Content-Type": "multipart/form-data" } });

  return data;
}
