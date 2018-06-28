import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { API_URL } from '../_services/API_URL';

@Injectable()

export class DriversService {
  constructor(
    private http: AuthHttp
  ) {}

  drivers_list(): Observable<any[]> {
    return this.http.get(`${API_URL}/api/user/drivers`)
      .map(r => r.json())
  }
}
