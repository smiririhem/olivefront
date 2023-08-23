import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS2 } from '../config/api2.url.config';
import { Moulin } from '../shared/moulin';
import { Moulinage } from '../shared/moulinage';

@Injectable({
  providedIn: 'root'
})
export class MoulinService {

  constructor(private http: HttpClient) {}

  getMoulins(): Observable<any> {
    return this.http.get(API_URLS2.MOULIN_URL);
  }

  addMoulin(moulin: Moulin): Observable<any> {
    return this.http.post(API_URLS2.MOULIN_URL, moulin);
  }

  updateMoulin(moulin: Moulin): Observable<any> {
    return this.http.put(API_URLS2.MOULIN_URL + `/${moulin.id}`, moulin);
  }

  deleteMoulin(id: number): Observable<any> {
    return this.http.delete(`${API_URLS2.MOULIN_URL}/${id}`);
  }
 }
