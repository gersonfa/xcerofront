import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { API_URL } from '../_services/API_URL';

@Injectable()

export class SiteService {

  constructor(
    private http: AuthHttp
  ) {}

  sites_by_group(groupId: string): Observable<any[]> {
    return this.http.get(`${API_URL}/api/group/${groupId}/site`)
      .map(r => r.json());
  }

  site_create(groupId: string, site: any): Observable<any> {
    return this.http.post(`${API_URL}/api/group/${groupId}/site`, site)
      .map(r => r.json());
  }
}
