import { Component } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projets',
  imports: [
    AdminHeaderComponent,
    CommonModule,

  ],
  templateUrl: './projets.component.html',
  styleUrl: './projets.component.scss'
})
export class ProjetsComponent {

  projets: any[] = [];
  userId: number  = 1; // Valeur par défaut pour le test
  likedProjects: number[] = [];

  constructor(
    private router: Router,
    private adminService: AdminService
  ) {
    const storedId = localStorage.getItem('id_user');
    this.userId = storedId ? parseInt(storedId, 10) : 0;

    console.log('ID utilisateur connecté :', this.userId);
  }

  ngOnInit() {
    this.fetchProjets();  
  }

  fetchProjets() {
    this.adminService.getProjets().subscribe((data: any[]) => {
      this.projets = data;

      // Vérifier le nombre de likes et si l'étudiant a liké chaque projet
      this.projets.forEach(projet => {
        // Récupérer le nombre de likes pour ce projet
        this.adminService.getLikesCount(projet.id).subscribe((response) => {
          projet.likesCount = response.likes; // Ajout du nombre de likes à chaque projet
        });
      });
    });
  }

}
