import { Component, OnInit } from '@angular/core';
import { Moulinage } from '../shared/moulinage';
import { MoulinageService } from './moulinage.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Extraction } from '../extraction/extraction.enum';
import { Moulin } from '../shared/moulin';
import { ChangeDetectorRef } from '@angular/core';
import { MoulinService } from '../moulin/moulin.service';
import { LotoliveService } from '../lotolive/lotolive.service';
import { Lotolive } from '../shared/lotolive';
import * as _ from "lodash";
import { Variete } from '../variete/variete.enum';


@Component({
  selector: 'app-moulinage',
  templateUrl: './moulinage.component.html',
  styleUrls: ['./moulinage.component.css']
})
export class MoulinageComponent implements OnInit {
  moulinages: Moulinage[] = [];
  moulinagesList: Moulinage[] = [];
  moulinageForm!: FormGroup;
  extractionOptions: string[] = [];
  moulins: Moulin[] = [];
  lotOlives: Lotolive[] = [];
  lotOlivesByVariete: any;
  varieteOptions: string[] = [];

  operation: 'add' | 'edit' | 'remove' = 'add';
  selectedMoulinage: Moulinage = new Moulinage();
  moulinOptions: any[] = [];
  moulinOption: any;

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  constructor(private moulinageService: MoulinageService, private moulinService: MoulinService, private fb: FormBuilder, private cdr: ChangeDetectorRef, private lotoliveService: LotoliveService) {
    this.createForm();
  }

  ngOnInit() {
    this.extractionOptions = Object.values(Extraction);
    this.loadMoulinages();
    this.loadMoulins()
    this.varieteOptions = Object.values(Variete);
    this.getLotOlives()
  }

  getLotOlives() {
    this.lotoliveService.getLotolives().subscribe(
      (data: any) => {
        this.lotOlives = _.filter(data, o => o.mouline == false);
        this.lotOlivesByVariete = _.groupBy(this.lotOlives, 'variete');
        this.refreshMoulinages();
      },
      error => {
        console.error('Error while loading moulinages:', error);
      }
    );
  }

  getLotOlivesByVariete(moulinage: Moulinage) {
    if (moulinage && moulinage.variete && this.lotOlivesByVariete)
      return this.lotOlivesByVariete[moulinage.variete]
    else return []
  }


  onChangeVariete() {

  }

  createForm() {
    this.moulinageForm = this.fb.group({
      moulin_id: [null, Validators.required],
      lotOlivesIds: [null, Validators.required],
      variete: [null, Validators.required],
      dateMoulinage: ['', Validators.required],
      quantite: ['', Validators.required],
      typeExtraction: ['']
    });
  }

  loadMoulinages() {
    this.selectedMoulinage = new Moulinage();
    this.moulinageForm.reset();
    this.moulinageService.getMoulinages().subscribe(
      (data: any) => {
        this.moulinages = data;
        this.refreshMoulinages();
      },
      error => {
        console.error('Error while loading moulinages:', error);
      }
    );
  }

  refreshMoulinages() {
    this.collectionSize = this.moulinages.length
    this.moulinagesList = this.moulinages.map((o, i) => ({ id: i + 1, ...o })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }

  loadMoulins() {
    this.moulinService.getMoulins().subscribe(
      (data: any) => {
        this.moulinOptions = data //._embedded.moulins;
        if (this.moulinOptions && this.moulinOptions.length > 0)
          this.moulinOption = this.moulinOptions[0]
      },
      error => {
        console.error('Error while loading moulins:', error);
      }
    );
  }


  addMoulinage() {
    if (this.moulinageForm.valid) {
      let newMoulinage = { ...this.moulinageForm.value };
      // newMoulinage.dateMoulinage = this.datepipe.transform(newMoulinage.dateMoulinage, 'dd/MM/yyyy');
      newMoulinage.moulin = this.moulinOptions.find(o => o.id == newMoulinage.moulin_id);
      this.moulinageService.addMoulinage(newMoulinage).subscribe(
        () => {
          this.initMoulinage();
          this.loadMoulinages();
          this.getLotOlives()
          this.cdr.detectChanges(); // Trigger change detection
        },
        error => {
          console.error('Error while adding moulinage:', error);
        }
      );
    } else {
      console.error('Form is invalid.');
    }
  }

  updateMoulinage() {
    this.selectedMoulinage.moulin = this.moulinOptions.find(o => o.id == this.selectedMoulinage.moulin_id);
    this.moulinageService.updateMoulinage(this.selectedMoulinage).subscribe(
      () => {
        this.initMoulinage();
        this.loadMoulinages();
        this.getLotOlives()
      },
      error => {
        console.error('Error while updating moulinage:', error);
      }
    );
  }

  onEdit(moulinage: any) {
    this.operation = 'edit';
    this.selectedMoulinage = moulinage;
    if (this.selectedMoulinage && this.selectedMoulinage.moulin)
      this.selectedMoulinage.moulin_id = this.selectedMoulinage.moulin.id
  }

  onSubmit() {
    if (this.moulinageForm.valid) {
      if (this.operation === 'add') {
        this.addMoulinage();
      } else if (this.operation === 'edit') {
        this.updateMoulinage();
      }
    } else {
      console.error('Form is invalid.');
    }
  }

  deleteMoulinage() {
    if (this.selectedMoulinage.id) {
      this.moulinageService.deleteMoulinage(this.selectedMoulinage.id).pipe(
        switchMap(() => this.moulinageService.getMoulinages())
      ).subscribe(
        (data: any) => {
          this.moulinages = data //._embedded.moulinages;
          this.initMoulinage();
          this.loadMoulinages();
          this.getLotOlives()
        },
        error => {
          console.error('Error while deleting moulinage:', error);
        }
      );
    } else {
      console.error('Cannot delete moulinage. ID is undefined.');
    }
  }


  initMoulinage() {
    this.selectedMoulinage = new Moulinage();
    this.createForm();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
}
}