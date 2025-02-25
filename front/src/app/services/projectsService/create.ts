import { httpClient } from "../httpClient";

type Check = {
  name: string;
  active: boolean;
}

export interface ProjectsParams {
  user_id: string;
  type: string;
  name: string;
  phone: string;
  email: string;
  number_pages: string | number;
  technical_information?: string;
  observations?: string;
  value_project: number;
  payment_method: string;
  installment?: number;
  other?: string;
  entry_payment?: number;
  proof?: File;
  plan_id: string;
  plan_name?: string;
  signed_contract: string;
  outsource?: string;
  closing_date: string;
  calendar_days: number;
  pages: string[];
  checklists: Check[];
}

export async function create(params: ProjectsParams) {
  const { data } = await httpClient.post('/projects', params, { headers: { "Content-Type": "multipart/form-data" } });

  return data;
}
