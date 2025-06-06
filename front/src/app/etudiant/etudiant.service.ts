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

  
  //updateProjet(projet: any): Observable<any> {
    //return this.http.post(`${this.apiUrl}/updateprojet`, projet);
  //}  

  ajouterProjetAvecLivrables(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/projets-avec-livrables`, formData);
  }

  updateProjetAvecLivrables(formData: FormData, projetId: number) {
    console.log("here", formData, projetId);
    return this.http.post(`${this.apiUrl}/projets/update/${projetId}`, formData);
  }
  

  deleteProjet(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteProjet/${id}`);
  }

//methode utilisant id
getEtudiantById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/getEtudiantById/${id}`);
}


// toggle like
toggleLike(projetId: number, etudiantId: number) {
  return this.http.post(`${this.apiUrl}/likes/toggle`, {
    projet_id: projetId,
    etudiant_id: etudiantId
  });
}

// check if liked
checkIfLiked(projetId: number, etudiantId: number) {
  return this.http.get<{ liked: boolean }>(`${this.apiUrl}/likes/check/${etudiantId}/${projetId}`);
}

// count likes pour un projet
getLikesCount(projetId: number) {
  return this.http.get<{ likes: number }>(`${this.apiUrl}/likes/count/${projetId}`);
}

getLikesReceivedByEtudiant(etudiantId: number) {
  return this.http.get<{ likes_received: number }>(`${this.apiUrl}/likes/received/${etudiantId}`);
}

getMostLikedProjet(etudiantId: number) {
  return this.http.get<{ projet_id: number, titre: string, likes: number }>(`${this.apiUrl}/likes/most-liked/${etudiantId}`);
}



}
