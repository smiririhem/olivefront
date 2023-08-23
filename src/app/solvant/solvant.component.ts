import { Component, OnInit } from '@angular/core';
import { Solvant } from '../shared/solvant';
import { SolvantService } from './solvant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { TypeSolvant } from '../typesolvant/typeSolvant.enum';
import {Moulin} from "../shared/moulin";

@Component({
  selector: 'app-solvant',
  templateUrl: './solvant.component.html',
  styleUrls: ['./solvant.component.css']
})
export class SolvantComponent implements OnInit {
  solvants: Solvant[] = [];
  solvantForm!: FormGroup;
  solvantOptions: string[] = [];
  operation: 'add' | 'edit' | 'remove' = 'add';
  selectedSolvant: Solvant = new Solvant();

  solvantsList: Solvant[] = [];

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  constructor(private solvantService: SolvantService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.solvantOptions = Object.values(TypeSolvant);
    this.loadSolvants();
  }

  createForm() {
    this.solvantForm = this.fb.group({
      mesure: ['', Validators.required],
      typeSolvant: ['']
    });
  }

  refreshSolvants() {
    this.collectionSize = this.solvants.length
    this.solvantsList = this.solvants.map((o, i) => ({ id: i + 1, ...o })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }

  loadSolvants() {
    this.solvantService.getSolvants().subscribe(
      (data: any) => {
        this.solvants = data;
        this.refreshSolvants();
      },
      error => {
        console.error('Error while loading solvants:', error);
      }
    );
  }


  addSolvant() {
    const newSolvant = this.solvantForm.value as Solvant;
    this.solvantService.addSolvant(newSolvant).subscribe(
      () => {
        this.initSolvant();
        this.loadSolvants();
      },
      error => {
        console.error('Error while adding solvant:', error);
      }
    );
  }

  updateSolvant() {
    this.solvantService.updateSolvant(this.selectedSolvant).subscribe(
      () => {
        this.initSolvant();
        this.loadSolvants();
      },
      error => {
        console.error('Error while updating solvant:', error);
      }
    );
  }

  onSubmit() {
    if (this.solvantForm.valid) {
      if (this.operation === 'add') {
        this.addSolvant();
      } else if (this.operation === 'edit') {
        this.updateSolvant();
      }
    } else {
      console.error('Form is invalid.');
    }
  }

  deleteSolvant() {
    if (this.selectedSolvant.id) {
      this.solvantService.deleteSolvant(this.selectedSolvant.id).pipe(
        switchMap(() => this.solvantService.getSolvants())
      ).subscribe(
        (data: any) => {
          this.solvants = data;
          this.initSolvant();
        },
        error => {
          console.error('Error while deleting solvant:', error);
        }
      );
    } else {
      console.error('Cannot delete solvant. ID is undefined.');
    }
  }


  initSolvant() {
    this.selectedSolvant = new Solvant();
    this.createForm();
  }
}

