import { httpClientArts } from "../httpClientArts";

export interface UserArtsParams {
  name: string;
  company: string;
  responsible: string;
  email: string;
  level: string;
  whatsapp: string;
  cpf: string;
  logo?: File | null;
  password: string;
  address: string;
  zipcode: string;
  city: string;
  state: string;
  neighborhood: string;
  credits: string | number;
  number: string;
}

export async function create(params: UserArtsParams) {
  const { data } = await httpClientArts.post('/users', params, { headers: { "Content-Type": "multipart/form-data" } });

  return data;
}
