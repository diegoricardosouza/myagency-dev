import { httpClient } from "../httpClient";

export interface SendApprovedParams {
  email: string;
  cliente: string;
  nomeprojeto: string;
  tipoprojeto: string;
  pagina: string;
}

export async function sendApproved(params: SendApprovedParams) {
  const { data } = await httpClient.post('/send-approved-page', params);

  return data;
}
