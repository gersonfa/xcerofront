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

  drivers_location(): Observable<any[]> {
    return this.http.get(`${API_URL}/api/user/location`)
      .map(r => r.json());
  }

  driver_details(driver_id: string): Observable<any> {
    return this.http.get(`${API_URL}/api/user/${driver_id}/driver_details`)
      .map(r => r.json());
  }

  driver_services(driver_id: string): Observable<any> {
    return this.http.get(`${API_URL}/api/service/driver/${driver_id}`)
      .map(r => r.json())
  }

  driver_inbox_create(driver_id: string, inbox: any): Observable<any> {
    return this.http.post(`${API_URL}/api/driver/${driver_id}/inbox`, inbox)
      .map(r => r.json())
  }

  driver_inbox_list(driver_id: string): Observable<any[]> {
    return this.http.get(`${API_URL}/api/driver/${driver_id}/inbox`)
      .map(r => r.json())
  }
}
