import { httpClient } from "../httpClient";

export interface UserParams {
  corporate_name?: string | null;
  fantasy_name: string;
  cnpj?: string | null;
  responsible?: string | null;
  level: string;
  cpf: string;
  zipcode: string;
  address: string;
  city: string;
  neighborhood: string;
  state: string;
  number: string;
  phone?: string | null;
  cellphone: string;
  site: string;
  email: string;
  password: string;
}

export async function create(params: UserParams) {
  const { data } = await httpClient.post('/users', params, { headers: { "Content-Type": "multipart/form-data" } });

  return data;
}
