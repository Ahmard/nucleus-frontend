import {LooseObject} from "~/types/loose.object";

export interface XhrResponseData {
  success: boolean
  status: number
  total_pages: number
  total_records: number
  data: LooseObject
}
