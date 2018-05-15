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
      .map(r => r.json())
  }

  tariff_list(): Observable<Tariff[]> {
    return this.http.get(`${API_URL}/api/tariff`)
      .map(r => r.json())
  }
}
