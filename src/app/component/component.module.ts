import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { MoulinComponent } from "../moulin/moulin.component";
import { SolvantComponent } from "../solvant/solvant.component";
import { RecipientComponent } from "../recipient/recipient.component";
import { RecipientService } from "../recipient/recipient.service";
import { MoulinageService } from "../moulinage/moulinage.service";
import { MoulinService } from "../moulin/moulin.service";
import { SolvantService } from "../solvant/solvant.service";
import { MoulinageComponent } from '../moulinage/moulinage.component';
import {BergerComponent} from "../berger/berger.component";
import {BergerService} from "../berger/berger.service";
import {LotoliveComponent} from "../lotolive/lotolive.component";
import {LotoliveService} from "../lotolive/lotolive.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
   
  
    
  ], declarations: [MoulinageComponent,
    MoulinComponent,
    SolvantComponent,
    RecipientComponent, BergerComponent, LotoliveComponent], providers: [MoulinageService, MoulinService, SolvantService, RecipientService, BergerService, LotoliveService]
})
export class ComponentsModule { }