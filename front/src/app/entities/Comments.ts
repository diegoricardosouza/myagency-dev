import { Files } from "./Jobs";
import { User } from "./User";

export interface Comments {
  id: string;
  content: string;
  user: User;
  files?: Files[];
  updated?: string;
}
