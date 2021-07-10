//reprezinta un dto pt partea de front-end
import {NumberValueAccessor} from "@angular/forms";

export interface Invoice{
  id?: string, // ? -> il face nullable, cand face un invoice nou, nu ii dai id ca si user ci isi pune el din database
  description: string,
  amount: number,
  sender: string,
  receiver: string,
  payed?: boolean
}
