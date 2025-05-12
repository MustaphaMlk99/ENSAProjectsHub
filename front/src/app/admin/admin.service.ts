import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  
  getEtudiants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getEtudiants`);
  }

  createEtudiant(etudiant: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/etudiant`, etudiant);
  }

  updateEtudiant(id: number, etudiant: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/etudiants/${id}`, etudiant);
  }

  deleteEtudiant(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/etudiants/${id}`);
  }





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

  createEncadrant(encadrant: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/encadrants`, encadrant);
  }

  updateEncadrant(id: number, encadrant: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/encadrants/${id}`, encadrant);
  }

  deleteEncadrant(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/encadrants/${id}`);
  }






  
  // Fetch general statistics
  getGeneralStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/statistiques/getStats`);
  }

  // Fetch statistics by module
  getProjectsByModule(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/statistiques/getProjectsByModule`);
  }

  // Fetch evaluations statistics by project
  getEvaluationsByProject(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/statistiques/getEvaluationsByProject`);
  }

  // Fetch statistics for projects by encadrant
  getProjectsByEncadrant(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/statistiques/getProjectsByEncadrant`);
  }




  getLikesCount(projetId: number) {
    return this.http.get<{ likes: number }>(`${this.baseUrl}/likes/count/${projetId}`);
  }

  // Méthode pour récupérer les données
  getProjets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getProjets`);
  }




}
