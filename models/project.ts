import BaseModel from "~/models/base.model";

export class Project extends BaseModel {
  project_id: string;
  user_id: string;
  name: string;
  description: string;
}
