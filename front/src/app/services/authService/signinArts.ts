import { httpClientArts } from "../httpClientArts";

export interface SigninParamsArts {
  email: string;
  password: string;
}

interface SigninResponseArts {
  token: string;
}

export async function signinArts(params: SigninParamsArts) {
  const { data } = await httpClientArts.post<SigninResponseArts>('/login', params);

  return data;
}
