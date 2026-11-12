import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Class } from '../../interfaces/class';
import { Race } from '../../interfaces/race';

@Injectable({
  providedIn: 'root',
})
export class RulesService {
  private readonly RULES_API_URL = `${environment.apiUrl}/api/rules`;

  constructor(private http: HttpClient) {}

  getRules(): Observable<{ classes: Class[]; races: Race[] }> {
    return this.http.get<{ classes: Class[]; races: Race[] }>(`${this.RULES_API_URL}`, { withCredentials: true });
  }

  getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(`${this.RULES_API_URL}/classes`, { withCredentials: true });
  }

  getRaces(): Observable<Race[]> {
    return this.http.get<Race[]>(`${this.RULES_API_URL}/races`, { withCredentials: true });
  }

}
