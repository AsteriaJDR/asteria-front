import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RulesService {
  private readonly RULES_API_URL = `${environment.apiUrl}/api/rules`;

  constructor(private http: HttpClient) {}

  getRules(): Observable<any> {
    return this.http.get<any>(`${this.RULES_API_URL}`, { withCredentials: true });
  }

  getClasses(): Observable<any> {
    return this.http.get<any>(`${this.RULES_API_URL}/classes`, { withCredentials: true });
  }

  getRaces(): Observable<any> {
    return this.http.get<any>(`${this.RULES_API_URL}/races`, { withCredentials: true });
  }
  
}
