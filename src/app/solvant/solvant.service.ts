import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API3_URLS } from '../config/api3.config';
import { Solvant } from '../shared/solvant';

@Injectable({
  providedIn: 'root'
})
export class SolvantService {

  constructor(private http: HttpClient) {}

  getSolvants(): Observable<any> {
    return this.http.get(API3_URLS.SOLVANT_URL);
  }

  addSolvant(solvant: Solvant): Observable<any> {
    return this.http.post(API3_URLS.SOLVANT_URL, solvant);
  }

  updateSolvant(solvant: Solvant): Observable<any> {
    return this.http.put(API3_URLS.SOLVANT_URL + `/${solvant.id}`, solvant);
  }

  deleteSolvant(id: number): Observable<any> {
    return this.http.delete(`${API3_URLS.SOLVANT_URL}/${id}`);
  }
}
