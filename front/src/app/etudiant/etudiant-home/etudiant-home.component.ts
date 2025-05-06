import { Component } from '@angular/core';
import { EtudiantHeaderComponent } from '../etudiant-header/etudiant-header.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { EtudiantService } from '../etudiant.service';

@Component({
  selector: 'app-etudiant-home',
  templateUrl: './etudiant-home.component.html',
  styleUrls: ['./etudiant-home.component.scss'],
  imports: [
    EtudiantHeaderComponent,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})

export class EtudiantHomeComponent {

  etudiantId: number  = 1; // Valeur par défaut pour le test
  public projects: any;
  projets: any[] = [];
  likedProjects: number[] = [];

  constructor(
    private router: Router,
    private etudiantService: EtudiantService
  ) {
    const storedId = localStorage.getItem('id_user');
    this.etudiantId = storedId ? parseInt(storedId, 10) : 0;

    console.log('ID utilisateur connecté :', this.etudiantId);
  }

  ngOnInit() {
    this.fetchProjets();
  }

  fetchProjets() {
    this.etudiantService.getProjets().subscribe((data: any[]) => {
      this.projets = data;

      // Vérifier le nombre de likes et si l'étudiant a liké chaque projet
      this.projets.forEach(projet => {
        // Récupérer le nombre de likes pour ce projet
        this.etudiantService.getLikesCount(projet.id).subscribe((response) => {
          projet.likesCount = response.likes; // Ajout du nombre de likes à chaque projet
        });

        // Vérifier si l'étudiant a déjà liké ce projet
        this.etudiantService.checkIfLiked(projet.id, this.etudiantId).subscribe((res) => {
          if (res.liked) {
            this.likedProjects.push(projet.id); // Marquer ce projet comme liké
          }
        });
      });
    });
  }

  toggleLike(projetId: number) {
    if (!this.etudiantId) return;

    this.etudiantService.toggleLike(projetId, this.etudiantId).subscribe(() => {
      const index = this.likedProjects.indexOf(projetId);
      if (index > -1) {
        // Projet déjà liké, on retire le like
        this.likedProjects.splice(index, 1);
      } else {
        // Projet non liké, on ajoute le like
        this.likedProjects.push(projetId);
      }

      // Mettre à jour le nombre de likes après l'action de like/unlike
      this.etudiantService.getLikesCount(projetId).subscribe((response) => {
        const projet = this.projets.find(p => p.id === projetId);
        if (projet) {
          projet.likesCount = response.likes;
        }
      });
    });
  }

  isProjetLiked(projetId: number): boolean {
    return this.likedProjects.includes(projetId);
  }
}
