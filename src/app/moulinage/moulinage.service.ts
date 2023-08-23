import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS } from '../config/api.url.config';
import { Moulinage } from '../shared/moulinage';
import { API_URLS2 } from '../config/api2.url.config';


@Injectable({
  providedIn: 'root'
})
export class MoulinageService {

  constructor(private http: HttpClient) {}

  getMoulinages(): Observable<any> {
    return this.http.get(API_URLS.MOULINAGE_URL);
  }

  addMoulinage(moulinage: Moulinage): Observable<any> {
    return this.http.post(API_URLS.MOULINAGE_URL, moulinage);
  }

  updateMoulinage(moulinage: Moulinage): Observable<any> {
    return this.http.put(API_URLS.MOULINAGE_URL + `/${moulinage.id}`, moulinage);
  }

  deleteMoulinage(id: number): Observable<any> {
    return this.http.delete(`${API_URLS.MOULINAGE_URL}/${id}`);
  }
  getMoulins(): Observable<any> {
    return this.http.get(API_URLS2.MOULIN_URL);
  }

}
