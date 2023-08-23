import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API5_URLS } from '../config/api5.url.config';
import {Berger} from "../shared/berger";

@Injectable({
  providedIn: 'root'
})
export class BergerService {

  constructor(private http: HttpClient) {}

  getBergers(): Observable<any> {
    return this.http.get(API5_URLS.BERGER_URL);
  }

  addBerger(berger: Berger): Observable<any> {
    return this.http.post(API5_URLS.BERGER_URL, berger);
  }

  updateBerger(berger: Berger): Observable<any> {
    return this.http.put(API5_URLS.BERGER_URL + `/${berger.id}`, berger);
  }

  deleteBerger(id: number): Observable<any> {
    return this.http.delete(`${API5_URLS.BERGER_URL}/${id}`);
  }
}
