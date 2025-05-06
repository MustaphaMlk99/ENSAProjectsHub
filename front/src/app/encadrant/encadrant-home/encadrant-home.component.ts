import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EncadrantHeaderComponent } from '../encadrant-header/encadrant-header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EncadrantService } from '../encadrant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encadrant-home',
  imports: [
    EncadrantHeaderComponent,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './encadrant-home.component.html',
  styleUrl: './encadrant-home.component.scss'
})
export class EncadrantHomeComponent {

  projets: any[] = [];
  userId: number  = 1; // Valeur par défaut pour le test
  likedProjects: number[] = [];

  constructor(
    private router: Router,
    private encadrantService: EncadrantService
  ) {
    const storedId = localStorage.getItem('id_user');
    this.userId = storedId ? parseInt(storedId, 10) : 0;

    console.log('ID utilisateur connecté :', this.userId);
  }

  ngOnInit() {
    this.fetchProjets();  
  }

  fetchProjets() {
    this.encadrantService.getProjets().subscribe((data: any[]) => {
      this.projets = data;

      // Vérifier le nombre de likes et si l'étudiant a liké chaque projet
      this.projets.forEach(projet => {
        // Récupérer le nombre de likes pour ce projet
        this.encadrantService.getLikesCount(projet.id).subscribe((response) => {
          projet.likesCount = response.likes; // Ajout du nombre de likes à chaque projet
        });
      });
    });
  }
}

