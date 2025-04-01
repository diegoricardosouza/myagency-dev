import { httpClient } from "../httpClient";

export interface EmailVerifyFinanceParams {
  project: string;
  company: string;
  responsible: string;
  url: string;
}

export async function verifyFinance(params: EmailVerifyFinanceParams) {
  const { data } = await httpClient.post('/send-mail-finance', params);

  return data;
}
