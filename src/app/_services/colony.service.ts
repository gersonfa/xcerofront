import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { API_URL } from '../_services/API_URL';
import { Group } from '../_models/group';
import { Colony } from '../_models/colony';

@Injectable()

export class ColonyService {
  constructor(
    private http: AuthHttp
  ) {}

  colony_create(groupId: string, colony: Colony): Observable<Colony> {
    return this.http.post(`${API_URL}/api/group/${groupId}/colony`, colony)
      .map(r => r.json())
  }

  colony_by_group(groupId: string): Observable<Colony[]> {
    return this.http.get(`${API_URL}/api/group/${groupId}/colony`)
      .map(r => r.json())
  }

  colony_delete(colony_id: string): Observable<Colony> {
    return this.http.delete(`${API_URL}/api/colony/${colony_id}`)
      .map(r => r.json());
  }

  colony_list(): Observable<Colony[]> {
    return this.http.get(`${API_URL}/api/colony`)
      .map(r => r.json());
  }
}
