import { Component, OnInit } from '@angular/core';
import { Lotolive } from '../shared/lotolive';
import { LotoliveService } from './lotolive.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Variete } from '../variete/variete.enum';
import { Berger } from '../shared/berger';
import { ChangeDetectorRef } from '@angular/core';
import { BergerService } from '../berger/berger.service';

@Component({
  selector: 'app-lotolive',
  templateUrl: './lotolive.component.html',
  styleUrls: ['./lotolive.component.css']
})
export class LotoliveComponent implements OnInit{

  lotolives: Lotolive[] = [];
  lotolivesList: Lotolive[] = [];
  lotoliveForm!: FormGroup;
  varieteOptions: string[] = [];
  bergers: Berger[] = [];

  operation: 'add' | 'edit' | 'remove' = 'add';
  selectedLotolive: Lotolive = new Lotolive();
  bergersOptions: any[] = [];
  bergerOption: any;

  page = 1;
  pageSize = 10;
  collectionSize = 0;
  constructor(private lotoliveService: LotoliveService, private bergerService: BergerService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.createForm();
  }

  ngOnInit() {
    this.varieteOptions = Object.values(Variete);
    this.loadLotolives();
    this.loadBergers()
  }


  createForm() {
    this.lotoliveForm = this.fb.group({
      berger_id: [null],
      dateRecolte: ['', Validators.required],
      quantite: ['', Validators.required],
      variete: ['']
    });


  }

  loadLotolives() {
    this.selectedLotolive = new Lotolive();
    this.lotoliveForm.reset();
    this.lotoliveService.getLotolives().subscribe(
      (data: any) => {
        this.lotolives = data;
        this.refreshLotolives();
      },
      error => {
        console.error('Error while loading lot olives:', error);
      }
    );
  }

  refreshLotolives() {
    this.collectionSize = this.lotolives.length
    this.lotolivesList = this.lotolives.map((o, i) => ({ id: i + 1, ...o })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }

  loadBergers() {
    this.bergerService.getBergers().subscribe(
      (data: any) => {
        this.bergersOptions = data
        if (this.bergersOptions && this.bergersOptions.length > 0)
          this.bergerOption = this.bergersOptions[0]
      },
      error => {
        console.error('Error while loading bergers:', error);
      }
    );
  }


  addLotolive() {
    if (this.lotoliveForm.valid) {
      let newLotolive = { ...this.lotoliveForm.value };
      newLotolive.berger = this.bergersOptions.find(o => o.id == newLotolive.berger_id);
      this.lotoliveService.addLotolive(newLotolive).subscribe(
        () => {
          this.initLotolive();
          this.loadLotolives();
          this.cdr.detectChanges(); // Trigger change detection
        },
        error => {
          console.error('Error while adding lot olive:', error);
        }
      );
    } else {
      console.error('Form is invalid.');
    }
  }

  updateLotolive() {
    this.lotoliveService.updateLotolive(this.selectedLotolive).subscribe(
      () => {
        this.initLotolive();
        this.loadLotolives();
      },
      error => {
        console.error('Error while updating lot olive:', error);
      }
    );
  }

  onSubmit() {
    if (this.lotoliveForm.valid) {
      if (this.operation === 'add') {
        this.addLotolive();
      } else if (this.operation === 'edit') {
        this.updateLotolive();
      }
    } else {
      console.error('Form is invalid.');
    }
  }

  deleteLotolive() {
    if (this.selectedLotolive.id) {
      this.lotoliveService.deleteLotolive(this.selectedLotolive.id).pipe(
        switchMap(() => this.lotoliveService.getLotolives())
      ).subscribe(
        (data: any) => {
          this.lotolives = data
          this.initLotolive();
        },
        error => {
          console.error('Error while deleting lot olive:', error);
        }
      );
    } else {
      console.error('Cannot delete lot olive. ID is undefined.');
    }
  }


  initLotolive() {
    this.selectedLotolive = new Lotolive();
    this.createForm();
  }

}
