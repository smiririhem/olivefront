// Import the Variete and Moulinage interfaces since they are used in the relationships
import { Variete } from "../variete/variete.enum";
import { Moulinage } from './moulinage';
import { Berger } from "./berger";

export class Lotolive {
  id?: number;
  variete?: Variete;
  quantite?: number;
  dateRecolte?: Date;
  mouline?: boolean;
  berger?: Berger;
}
