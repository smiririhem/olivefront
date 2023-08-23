// Import the TypeHuile and Moulinage interfaces since they are used in the relationships
import { TypeHuile } from '../typeHuile/typehuile.enum';
import { Moulinage } from './moulinage';
import { Citerne } from './citerne';

export class Lothuile {
  id?: number;
  nomProducteur?: string;
  quantiteObtenue?: number;
  tauxAciditeHuile?: number;
  nbCiterne?: number;
  typeHuile?: TypeHuile;
  moulinage?: Moulinage;
}
