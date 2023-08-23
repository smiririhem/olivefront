import { Component, OnInit } from '@angular/core';
import { Moulin } from '../shared/moulin';
import { MoulinService } from './moulin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Moulinage } from '../shared/moulinage';

@Component({
  selector: 'app-moulin',
  templateUrl: './moulin.component.html',
  styleUrls: ['./moulin.component.css']
})
export class MoulinComponent implements OnInit {
  moulins: Moulin[] = [];
  moulinsList: Moulin[] = [];

  moulinForm!: FormGroup;
  operation: 'add' | 'edit' | 'remove' = 'add';
  selectedMoulin: Moulin = new Moulin();

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  constructor(private moulinService: MoulinService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.loadMoulins();
  }

  createForm() {
    this.moulinForm = this.fb.group({
      nom: ['', Validators.required],
      details: ['', Validators.required]
    });
  }

  loadMoulins() {
    this.moulinService.getMoulins().subscribe(
      (data: any) => {
        this.moulins = data //._embedded.moulins;
        this.refreshMoulins();
      },
      error => {
        console.error('Error while loading moulins:', error);
      }
    );
  }

  addMoulin() {
    const newMoulin = this.moulinForm.value as Moulin;

    this.moulinService.addMoulin(newMoulin).subscribe(
      () => {
        this.initMoulin();
        this.loadMoulins();
      },
      error => {
        console.error('Error while adding moulin:', error);
      }
    );
  }

  updateMoulin() {
    this.moulinService.updateMoulin(this.selectedMoulin).subscribe(
      () => {
        this.initMoulin();
        this.loadMoulins();
      },
      error => {
        console.error('Error while updating moulin:', error);
      }
    );
  }
  refreshMoulins() {
    this.collectionSize = this.moulins.length
    this.moulinsList = this.moulins.map((o, i) => ({ id: i + 1, ...o })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }

  onSubmit() {
    if (this.moulinForm.valid) {
      if (this.operation === 'add') {
        this.addMoulin();
      } else if (this.operation === 'edit') {
        this.updateMoulin();
      }
    } else {
      console.error('Form is invalid.');
    }
  }

  deleteMoulin() {
    if (this.selectedMoulin.id) {
      this.moulinService.deleteMoulin(this.selectedMoulin.id).pipe(
        switchMap(() => this.moulinService.getMoulins())
      ).subscribe(
        (data: any) => {
          this.moulins = data //._embedded.moulins;
          this.initMoulin();
        },
        error => {
          console.error('Error while deleting moulin:', error)
        }
      );
    } else {
      console.error('Cannot delete moulin. ID is undefined.');
    }
  }

  initMoulin() {
    this.selectedMoulin = new Moulin();
    this.createForm();
  }
}
