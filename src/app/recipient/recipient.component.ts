import { Component, OnInit } from '@angular/core';
import { Recipient } from '../shared/recipient';
import { RecipientService } from './recipient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { Citerne } from '../shared/citerne';
import { TypeRecipient } from '../typeRecipient/typeRecipient.enum';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.css']
})
export class RecipientComponent implements OnInit {
  recipients: Recipient[] = [];
  recipientsList: Recipient[] = [];
  recipientForm!: FormGroup;
  recipientOptions: string[] = [];
  operation: 'add' | 'edit' | 'remove' = 'add';
  selectedRecipient: Recipient = new Recipient();

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  constructor(private recipientService: RecipientService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.recipientOptions = Object.values(TypeRecipient);
    this.loadRecipients();
  }

  refreshRecipients() {
    this.collectionSize = this.recipients.length
    this.recipientsList = this.recipients.map((o, i) => ({ id: i + 1, ...o })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }

  createForm() {
    this.recipientForm = this.fb.group({
      emplacement: [''],
      typerecipient: [''],
      TypeRecipient:[],
      CodeQr:[]
    });
  }

  loadRecipients() {
    this.recipientService.getRecipient().subscribe(
      (data: any) => {
        this.recipients = data;
        this.refreshRecipients();
      },
      error => {
        console.error('Error while loading recipients:', error);
      }
    );
  }

  addRecipient() {
    const newRecipient = this.recipientForm.value as Recipient;
    this.recipientService.addRecipient(newRecipient).subscribe(
      () => {
        this.initRecipient();
        this.loadRecipients();
      },
      error => {
        console.error('Error while adding recipient:', error);
      }
    );
  }

  updateRecipient() {
    this.recipientService.updateRecipient(this.selectedRecipient).subscribe(
      () => {
        this.initRecipient();
        this.loadRecipients();
      },
      error => {
        console.error('Error while updating recipient:', error);
      }
    );
  }

  onSubmit() {
    if (this.recipientForm.valid) {
      if (this.operation === 'add') {
        this.addRecipient();
      } else if (this.operation === 'edit') {
        this.updateRecipient();
      }
    } else {
      console.error('Form is invalid.');
    }
  }

  deleteRecipient() {
    if (this.selectedRecipient.id) {
      this.recipientService.deleteRecipient(this.selectedRecipient.id).pipe(
        switchMap(() => this.recipientService.getRecipient())
      ).subscribe(
        (data: any) => {
          this.recipients = data;
          this.initRecipient();
        },
        error => {
          console.error('Error while deleting recipient:', error);
        }
      );
    } else {
      console.error('Cannot delete recipient. ID is undefined.');
    }
  }

  initRecipient() {
    this.selectedRecipient = new Recipient();
    this.createForm();
  }
}
