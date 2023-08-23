import { Lotolive } from './lotolive';
import { Solvant } from './solvant';
import { Moulin } from './moulin';
import { Extraction } from '../extraction/extraction.enum';

export class Moulinage {
  constructor(
    public id?: number,
    public dateMoulinage?: Date,
    public quantite?: number,
    public typeExtraction?: Extraction,
    public lotolives?: Lotolive[],
    public solvants?: Solvant[],
    public moulin?: Moulin,
    public moulin_id?: number,
    public variete?: string,
    public lotOlivesIds?: number[],
    public lotOlives?: Lotolive[]
  ) { }
}
