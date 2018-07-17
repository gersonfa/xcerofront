import { Injectable } from "@angular/core";
import { AuthHttp } from "angular2-jwt";
import { Tariff } from "../_models/tariff";
import { API_URL } from "./API_URL";
import { Observable } from 'rxjs/Rx';
@Injectable()

export class TariffService {
  constructor(
    private http: AuthHttp
  ) {}

  tariff_create(tariff: Tariff): Observable<Tariff> {
    return this.http.post(`${API_URL}/api/tariff`, tariff)
      .map(r => r.json());
  }

  tariff_list(): Observable<Tariff[]> {
    return this.http.get(`${API_URL}/api/tariff`)
      .map(r => r.json());
  }

  tariff_delete(tariffId: string): Observable<Tariff> {
    return this.http.delete(`${API_URL}/api/tariff/${tariffId}`)
      .map(r => r.json());
  }

  tariff_update(tariff: any): Observable<Tariff> {
    return this.http.put(`${API_URL}/api/tariff/${tariff._id}`, tariff)
      .map(r => r.json());
  }

  tariff_update_all(quantity: any): Observable<any[]> {
    return this.http.put(`${API_URL}/api/tariff/update/all`, quantity)
      .map(r => r.json());
  }
}
