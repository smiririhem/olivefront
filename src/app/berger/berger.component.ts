import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import {Berger} from "../shared/berger";
import {BergerService} from "./berger.service";

@Component({
  selector: 'app-berger',
  templateUrl: './berger.component.html',
  styleUrls: ['./berger.component.scss']
})

export class BergerComponent implements OnInit {
  bergers: Berger[] = [];
  bergersList: Berger[] = [];

  bergerForm!: FormGroup;
  operation: 'add' | 'edit' | 'remove' = 'add';
  selectedBerger: Berger = new Berger();

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  constructor(private bergerService: BergerService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.loadBergers();
  }

  createForm() {
    this.bergerForm = this.fb.group({
      nom: ['', Validators.required],
      details: ['', Validators.required]
    });
  }

  loadBergers() {
    this.bergerService.getBergers().subscribe(
      (data: any) => {
        this.bergers = data //._embedded.moulins;
        this.refreshBergers();
      },
      error => {
        console.error('Error while loading bergers:', error);
      }
    );
  }

  addBerger() {
    const newBerger = this.bergerForm.value as Berger;

    this.bergerService.addBerger(newBerger).subscribe(
      () => {
        this.initBerger();
        this.loadBergers();
      },
      error => {
        console.error('Error while adding berger:', error);
      }
    );
  }

  updateBerger() {
    this.bergerService.updateBerger(this.selectedBerger).subscribe(
      () => {
        this.initBerger();
        this.loadBergers();
      },
      error => {
        console.error('Error while updating berger:', error);
      }
    );
  }
  refreshBergers() {
    this.collectionSize = this.bergers.length
    this.bergersList = this.bergers.map((o, i) => ({ id: i + 1, ...o })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }

  onSubmit() {
    if (this.bergerForm.valid) {
      if (this.operation === 'add') {
        this.addBerger();
      } else if (this.operation === 'edit') {
        this.updateBerger();
      }
    } else {
      console.error('Form is invalid.');
    }
  }

  deleteBerger() {
    if (this.selectedBerger.id) {
      this.bergerService.deleteBerger(this.selectedBerger.id).pipe(
        switchMap(() => this.bergerService.getBergers())
      ).subscribe(
        (data: any) => {
          this.bergers = data //._embedded.moulins;
          this.initBerger();
        },
        error => {
          console.error('Error while deleting berger:', error)
        }
      );
    } else {
      console.error('Cannot delete berger. ID is undefined.');
    }
  }

  initBerger() {
    this.selectedBerger = new Berger();
    this.createForm();
  }
}
