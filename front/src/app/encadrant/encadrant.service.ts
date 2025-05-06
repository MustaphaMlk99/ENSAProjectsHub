import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncadrantService {
  private apiUrl = 'http://localhost:8000/api'; // L'URL de ton API

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les données
  getProjets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getProjets`);
  }

  //methode utilisant id
  getEncadrantById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getEncadrantById/${id}`);
  }


  // count likes pour un projet
  getLikesCount(projetId: number) {
    return this.http.get<{ likes: number }>(`${this.apiUrl}/likes/count/${projetId}`);
  }

}
