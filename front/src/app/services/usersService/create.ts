import { httpClient } from "../httpClient";

export interface UserParams {
  corporate_name?: string | null;
  fantasy_name: string;
  cnpj?: string | null;
  responsible?: string | null;
  level: string;
  cpf?: string | null;
  zipcode?: string | null;
  address?: string | null;
  city?: string | null;
  neighborhood?: string | null;
  state?: string | null;
  number?: string | null;
  phone?: string | null;
  cellphone: string;
  site?: string | null;
  email: string;
  password: string;
}

export async function create(params: UserParams) {
  const { data } = await httpClient.post('/users', params, { headers: { "Content-Type": "multipart/form-data" } });

  return data;
}
