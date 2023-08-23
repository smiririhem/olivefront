// Import the TypeHuile and Citerne interfaces since they are used in the relationships
import { TypeRecipient } from "../typeRecipient/typeRecipient.enum";
import { Citerne } from "./citerne";

export class  Recipient {
  id?: number;
  codeQr?: string;
  emplacement?:string;
  typeRecipient?: TypeRecipient;
  citerne?: Citerne; 
}
