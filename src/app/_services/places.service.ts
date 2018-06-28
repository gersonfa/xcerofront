import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { API_URL } from '../_services/API_URL';

@Injectable()

export class PlacesService {
  constructor(
    private http: AuthHttp
  ) {}

  places_list(): Observable<any[]> {
    return this.http.get(`${API_URL}/api/place`)
      .map(r => r.json())
  }

  places_by_base(baseId: string): Observable<any[]> {
    return this.http.get(`${API_URL}/api/base/${baseId}/place`)
      .map(r => r.json());
  }

  place_create(baseId: string, place: any): Observable<any> {
    return this.http.post(`${API_URL}/api/base/${baseId}/place`, place)
      .map(r => r.json());
  }
}
