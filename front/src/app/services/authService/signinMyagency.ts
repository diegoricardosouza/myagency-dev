import { httpClientMyagency } from "../httpClientMyagency";

export interface SigninParamsMyagency {
  email: string;
  password: string;
}

interface SigninResponseMyagency {
  token: string;
}

export async function signinMyagency(params: SigninParamsMyagency) {
  const { data } = await httpClientMyagency.post<SigninResponseMyagency>('/login', params);

  return data;
}
