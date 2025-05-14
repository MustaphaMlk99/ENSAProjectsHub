import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  
  getAdminById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getAdminById/${id}`);
  }


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
    return this.http.delete(`${this.baseUrl}/admins/${id}`);
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






  
// Fetch general statistics (number of students, admins, etc.)
getGeneralStats() {
return this.http.get('/api/stats');
}

getProjectsByModule(): Observable<any[]> {
  return this.http.get<any[]>('/api/projects-by-module');
}

getProjectsByEncadrant(): Observable<any[]> {
  return this.http.get<any[]>('/api/projects-by-encadrant');
}

getSubmissionRates(): Observable<any[]> {
  return this.http.get<any[]>('/api/submission-rates');
}

getEvaluationDistribution(): Observable<any[]> {
  return this.http.get<any[]>('/api/evaluation-distribution');
}

getEvaluationsByProject(): Observable<any[]> {
  return this.http.get<any[]>('/api/evaluations-by-project');
}

getLikesVsEvaluations(): Observable<any[]> {
  return this.http.get<any[]>('/api/likes-vs-evaluations');
}

getEncadrantWorkload(): Observable<any[]> {
  return this.http.get<any[]>('/api/encadrant-workload');
}

getStudentEngagement(): Observable<any> {
  return this.http.get<any>('/api/student-engagement');
}

getMonthlyUserRegistrations(): Observable<any[]> {
  return this.http.get<any[]>('/api/monthly-user-registrations');
}

getModulePopularityByLikes(): Observable<any[]> {
  return this.http.get<any[]>('/api/module-popularity-by-likes');
}

getTopRatedProjects(): Observable<any[]> {
  return this.http.get<any[]>('/api/top-rated-projects');
}

getAvgTimeToFirstSubmission(): Observable<any[]> {
  return this.http.get<any[]>('/api/avg-time-to-first-submission');
}








  getLikesCount(projetId: number) {
    return this.http.get<{ likes: number }>(`${this.baseUrl}/likes/count/${projetId}`);
  }

  // Méthode pour récupérer les données
  getProjets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getProjets`);
  }




}
