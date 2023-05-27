import BaseModel from "~/models/base.model";

export class Budget extends BaseModel {
  budget_id: string;
  user_id: string;
  amount: string;
  month: number;
  year: number;
  narraton: string | null
}
