import BaseModel from "~/models/base.model";

export class Expense extends BaseModel {
  expese_id: string;
  user_id: string;
  project_id: string;
  amount: string;
  narration: string;

  static cleanupTimestamp(timestamp: string) {
    return timestamp.replaceAll('T', ' ')
  }
}
