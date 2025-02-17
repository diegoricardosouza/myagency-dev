import { User } from "./User";

export interface Project {
  id: string;
  project_name: string;
  type: string;
  name: string;
  phone: string;
  email: string;
  number_pages: number;
  technical_information: string;
  observations: string;
  value_project: number;
  payment_method: string;
  installment: number;
  other: string;
  entry_payment: number;
  proof: string;
  plan_id: string;
  plan_name: string;
  signed_contract: string;
  outsource: string;
  closing_date: string;
  calendar_days: string;
  pages: string[];
  user: User;
}
