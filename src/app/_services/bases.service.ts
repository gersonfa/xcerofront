import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { API_URL } from '../_services/API_URL';
import { Base } from '../_models/base';
import { Group } from '../_models/group';

@Injectable()

export class BaseService {
  constructor(
    private http: AuthHttp
  ) {}

  base_create(base: Base): Observable<Base> {
    return this.http.post(`${API_URL}/api/base`, base)
      .map(r => r.json())
  }

  base_details(baseId: string): Observable<Base> {
    return this.http.get(`${API_URL}/api/base/${baseId}`)
      .map(r => r.json());
  }

  base_list(): Observable<Base[]> {
    return this.http.get(`${API_URL}/api/base`)
      .map(r => r.json())
  }

  base_empty(baseId): Observable<any> {
    return this.http.put(`${API_URL}/api/base/empty_stack/${baseId}`, {})
      .map(r => r.json());
  }

  base_delete(baseId: string): Observable<any> {
    return this.http.delete(`${API_URL}/api/base/${baseId}`)
      .map(r => r.json())
  }

  group_create(group: Group): Observable<Group> {
    return this.http.post(`${API_URL}/api/group`, group)
      .map(r => r.json())
  }

  group_list(baseId: string): Observable<Group[]> {
    return this.http.get(`${API_URL}/api/group`)
      .map(r => r.json())
  }

}
