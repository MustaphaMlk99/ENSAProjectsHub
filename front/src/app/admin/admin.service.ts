import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: `root`
})
export class AdminService {
  private baseUrl = `http://localhost:8000/api`;

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
getProjectsByEncadrant(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/projects-by-encadrant`);
}

getEvaluationsByProject(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/evaluations-by-project`);
}


getGeneralStats() {
return this.http.get(`${this.baseUrl}/stats`);
}

getProjectsByModule(moduleId?: number): Observable<any[]> {
  if(moduleId) {
    return this.http.get<any[]>(`/api/projects/module/${moduleId}`);
  } else {
    return this.http.get<any[]>(`/api/projects`); // or some default endpoint
  }
}

getProjectsByModule2(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/projects_by_module`);
}

getSubmissionRates(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/submission_rates`);
}

getEvaluationDistribution(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/Evaluation_Distribution`);
}

getLikesVsEvaluations(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/Likes_Vs_Evaluations`);
}

getEncadrantWorkload(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/Encadrant_Workload`);
}

getStudentEngagement(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/Student_Engagement`);
}

getMonthlyUserRegistrations(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/Monthly_User_Registrations`);
}

getModulePopularityByLikes(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/getModulePopularityByLikes`);
}

getTopRatedProjects(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/getTopRatedProjects`);
}

getAvgTimeToFirstSubmission(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/getAvgTimeToFirstSubmission`);
}

  getLikesCount(projetId: number) {
    return this.http.get<{ likes: number }>(`${this.baseUrl}/likes/count/${projetId}`);
  }

  // Méthode pour récupérer les données
  getProjets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getProjets`);
  }

  // Projets
  getProjectsSortedBy(sort: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admin/projects/sorted/${sort}`);
  }

  getProjectsSortedByLikes(direction: 'asc' | 'desc'): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/projets/sorted-by-likes/${direction}`);
  }

  getProjectsByYear(year: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/projets/by-year/${year}`);
  }

getAvailableYears(): Observable<string[]> {
  return this.http.get<string[]>(`${this.baseUrl}/projets/years`);
}

getModules() {
  return this.http.get<any[]>('/api/modules');
}



}
