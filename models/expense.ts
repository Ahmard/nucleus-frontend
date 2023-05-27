import BaseModel from "~/models/base.model";
import {LooseObject} from "~/types/loose.object";
import {from_cent} from "~/helpers/monetery";

export class Expense extends BaseModel {
  expense_id: string;
  user_id: string;
  project_id: string;
  amount: string;
  narration: string;

  static cleanupTimestamp(timestamp: string) {
    return timestamp.replaceAll('T', ' ')
  }

  static format_aggregate(stats: LooseObject): LooseObject {
    stats.today_expenses = from_cent(parseInt(stats.today_expenses))
    stats.week_expenses = from_cent(parseInt(stats.week_expenses))
    stats.month_expenses = from_cent(parseInt(stats.month_expenses))
    stats.year_expenses = from_cent(parseInt(stats.year_expenses))
    return stats
  }
}
