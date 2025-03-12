import { httpClient } from "../httpClient";

type Check = {
  name: string;
  active: boolean;
}

export interface UpdateProjectParams {
  id: string;
  user_id?: string;
  type?: string;
  name?: string;
  phone?: string;
  email?: string;
  number_pages?: string | number;
  technical_information?: null | string;
  observations?: string;
  value_project?: number;
  payment_method?: string;
  installment?: number;
  other?: string;
  entry_payment?: number;
  proof?: File;
  plan_id?: string;
  plan_name?: string;
  signed_contract?: string;
  outsource?: string;
  closing_date?: string;
  temporary_link?: string;
  calendar_days?: number;
  pages?: string[];
  checklists?: Check[];
}

export async function update({ id, ...params }: UpdateProjectParams) {
  const { data } = await httpClient.post(`/projects/${id}`, params, { headers: { "Content-Type": "multipart/form-data" } });

  return data;
}
