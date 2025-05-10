import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {

  // Define the base API URL (adjust it based on your API setup)
  private baseUrl = 'http://localhost:8000/api/statistiques';  // Change this to the correct base URL

  constructor(private http: HttpClient) {}

  // Fetch general statistics
  getGeneralStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getStats`);
  }

  // Fetch statistics by module
  getProjectsByModule(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getProjectsByModule`);
  }

  // Fetch evaluations statistics by project
  getEvaluationsByProject(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getEvaluationsByProject`);
  }

  // Fetch statistics for projects by encadrant
  getProjectsByEncadrant(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getProjectsByEncadrant`);
  }
}
