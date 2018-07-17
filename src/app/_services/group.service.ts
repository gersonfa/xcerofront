import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { API_URL } from '../_services/API_URL';
import { Group } from '../_models/group';

@Injectable()

export class GroupService {

  constructor(
    private http: AuthHttp
  ) { }

  group_by_base(baseId: string): Observable<Group[]> {
    return this.http.get(`${API_URL}/api/base/${baseId}/group`)
      .map(r => r.json());
  }

  group_create(baseId: string, group: Group): Observable<Group> {
    return this.http.post(`${API_URL}/api/base/${baseId}/group`, group)
      .map(r => r.json());
  }

  group_list_available(gp: any): Observable<Group[]> {
    return this.http.get(`${API_URL}/api/group/place/available`, {params: gp})
      .map(r => r.json());
  }

  group_list(): Observable<Group[]> {
    return this.http.get(`${API_URL}/api/group`)
      .map(r => r.json())
  }

  group_place_list(): Observable<any[]> {
    return this.http.get(`${API_URL}/api/group/place`)
      .map(r => r.json());
  }

}
