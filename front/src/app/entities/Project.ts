import { Checklist } from "./Checklist";
import { Jobs } from "./Jobs";
import { User } from "./User";

export interface Project {
  id: string;
  project_name: string;
  type: string;
  name: string;
  phone: string;
  email: string;
  number_pages: string;
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
  temporary_link?: string;
  finished?: boolean;
  finished_date?: string | number | Date;
  pages: Jobs[];
  jobs: Jobs[];
  checklists: Checklist[];
  user: User;
}
