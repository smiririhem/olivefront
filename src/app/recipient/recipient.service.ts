import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API4_URLS } from '../config/api4.config';
import { Recipient } from '../shared/recipient';

@Injectable({
  providedIn: 'root'
})
export class RecipientService {

  constructor(private http: HttpClient) {}

  getRecipient(): Observable<any> {
    return this.http.get(API4_URLS.RECIPIENT_URL);
  }

  addRecipient(recipient: Recipient): Observable<any> {
    return this.http.post(API4_URLS.RECIPIENT_URL, recipient);
  }

  updateRecipient(recipient: Recipient): Observable<any> {
    return this.http.put(API4_URLS.RECIPIENT_URL + `/${recipient.id}`, recipient);
  }

  deleteRecipient(id: number): Observable<any> {
    return this.http.delete(`${API4_URLS.RECIPIENT_URL}/${id}`);
  }
}
