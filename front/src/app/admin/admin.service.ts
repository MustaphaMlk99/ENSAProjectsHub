import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8000/api';
  private baseUrl2 = 'http://localhost:8000/api/statistiques';  // Change this to the correct base URL


  constructor(private http: HttpClient) {}

  getAdmins(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admins`);
  }

  createAdmin(admin: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admins`, admin);
  }

  updateAdmin(id: number, admin: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admins/${id}`, admin);
  }

  deleteAdmin(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }






  getEncadrants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getEncadrants`);
  }

  createEncadrant(etudiant: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/encadrants`, etudiant);
  }

  updateEncadrant(id: number, etudiant: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/encadrants/${id}`, etudiant);
  }

  deleteEncadrant(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/encadrants/${id}`);
  }



  getEtudiants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getEtudiants`);
  }

  createEtudiant(encadrant: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/etudiants`, encadrant);
  }

  updateEtudiant(id: number, encadrant: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/etudiants/${id}`, encadrant);
  }

  deleteEtudiant(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/etudiants/${id}`);
  }




  
  // Fetch general statistics
  getGeneralStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl2}/getStats`);
  }

  // Fetch statistics by module
  getProjectsByModule(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl2}/getProjectsByModule`);
  }

  // Fetch evaluations statistics by project
  getEvaluationsByProject(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl2}/getEvaluationsByProject`);
  }

  // Fetch statistics for projects by encadrant
  getProjectsByEncadrant(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl2}/getProjectsByEncadrant`);
  }


}
