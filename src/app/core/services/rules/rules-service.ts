import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RulesService {
  private readonly RULES_API_URL = 'http://localhost:3000/api/rules';

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
