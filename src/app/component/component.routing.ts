import { Routes } from '@angular/router';

import { MoulinageComponent } from '../moulinage/moulinage.component';
import { MoulinComponent } from '../moulin/moulin.component';
import { SolvantComponent } from '../solvant/solvant.component';
import { RecipientComponent } from '../recipient/recipient.component';
import {BergerComponent} from "../berger/berger.component";
import {LotoliveComponent} from "../lotolive/lotolive.component";


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
      { path: 'berger', component: BergerComponent },
      { path: 'lotolive', component: LotoliveComponent },
			{ path: 'moulinage', component: MoulinageComponent },
			{ path: 'moulin', component: MoulinComponent },
			{ path: 'solvant', component: SolvantComponent },
			{ path: 'recipient', component: RecipientComponent },


		]
	}
];
