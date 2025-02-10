import { httpClient } from "../httpClient";

export interface UpdateUserParams {
  id: string;
  corporate_name: string;
  fantasy_name: string;
  cnpj: string;
  responsible: string;
  level: string;
  cpf: string;
  zipcode: string;
  address: string;
  city: string;
  neighborhood: string;
  state: string;
  number: string;
  phone: string;
  cellphone: string;
  site: string;
  email: string;
  password?: string | null;
}

export async function update({ id, ...params }: UpdateUserParams) {
  const { data } = await httpClient.post(`/users/${id}`, params, { headers: { "Content-Type": "multipart/form-data" } });

  return data;
}
