import { TypeCiterne } from "../typeCiterne/typeCiterne.enum";
import {Lothuile} from "./lothuile";
export class  Citerne {
  id?: number;
  codeQr?: string;
  emplacement?: string;
  capaciteReel?: number;
  typeCiterne?: TypeCiterne;
  lothuile?: Lothuile;
}
