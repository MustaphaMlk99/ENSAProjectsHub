import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private apiUrl = 'http://localhost:8000/api'; // L'URL de ton API

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les données
  getProjets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getProjets`);
  }

  getEncadrants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getEncadrants`);
  }

  getModules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getModules`);
  }


// methodes pour projet
  getProjetById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/projet/${id}`);
  }

  ajouterProjet(projetData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ajouterProjet`, projetData);
  }

  updateProjet(projet: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/updateprojet`, projet);
  }  







//methode utilisant id
  getEtudiantById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getEtudiantById/${id}`);
  }
}
