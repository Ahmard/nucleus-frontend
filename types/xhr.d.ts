import {LooseObject} from "~/types/loose.object";

export interface XhrResponse {
  success: boolean
  status:number
  data: LooseObject
}
