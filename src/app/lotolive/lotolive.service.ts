import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API5_URLS} from '../config/api5.url.config';
import { API6_URLS} from '../config/api6.url.config';
import { Berger } from '../shared/berger';
import {Lotolive} from "../shared/lotolive";

@Injectable({
  providedIn: 'root'
})
export class LotoliveService {

  constructor(private http: HttpClient) {}

  getLotolives(): Observable<any> {
    return this.http.get(API6_URLS.LOTOLIVE_URL);
  }

  addLotolive(lotolive: Lotolive): Observable<any> {
    return this.http.post(API6_URLS.LOTOLIVE_URL, lotolive);
  }

  updateLotolive(lotolive: Lotolive): Observable<any> {
    return this.http.put(API6_URLS.LOTOLIVE_URL + `/${lotolive.id}`, lotolive);
  }

  deleteLotolive(id: number): Observable<any> {
    return this.http.delete(`${API6_URLS.LOTOLIVE_URL}/${id}`);
  }
  getBergers(): Observable<any> {
    return this.http.get(API5_URLS.BERGER_URL);
  }
}
