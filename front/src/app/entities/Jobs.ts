import { ProjectFile } from "@/view/pages/Projects/ShowProject/useShowProjectController";
import { Comments } from "./Comments";
import { User } from "./User";

export interface Files {
  id: string;
  name: string;
  url: string;
  size?: string;
  type?: string;
  created_at?: string;
}

export interface Jobs {
  id: string;
  referencia: string;
  site: string;
  page: string;
  format: string;
  other_formats: string;
  phrase: string;
  content: string;
  obs: string;
  type: string;
  status: string;
  created: string;
  user: User;
  files?: ProjectFile[];
  comments?: Comments[];
  updated_at?: string;
  project_id?: string;
}
