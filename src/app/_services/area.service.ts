import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { API_URL } from '../_services/API_URL';

@Injectable()

export class AreaService {
  constructor(
    private http: AuthHttp
  ) {}

  area_create(groupId: string, area): Observable<any> {
    return this.http.post(`${API_URL}/api/group/${groupId}/area`, area)
      .map(r => r.json());
  }

  area_by_group(groupId: string): Observable<any[]> {
    return this.http.get(`${API_URL}/api/group/${groupId}/area`)
      .map(r => r.json());
  }

  area_delete(area_id: string): Observable<any> {
    return this.http.delete(`${API_URL}/api/area/${area_id}`)
      .map(r => r.json());
  }

  area_list(): Observable<any[]> {
    return this.http.get(`${API_URL}/api/area`)
      .map(r => r.json());
  }
}
