import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EtudiantHeaderComponent } from '../etudiant-header/etudiant-header.component';
import { EtudiantService } from '../etudiant.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.scss',
  imports: [    
  EtudiantHeaderComponent,
  CommonModule, 
  MatCardModule, 
  MatButtonModule]
})
export class HistoriqueComponent {
  user_id: number | null = null;
  public projects: any;
  selectedProject: any = null;

constructor(private etudiantService: EtudiantService) {
  const storedId = localStorage.getItem('id_user');
  this.user_id = storedId ? parseInt(storedId, 10) : null;

  console.log('ID utilisateur connecté :', this.user_id);
}

ngOnInit(): void {
  this.etudiantService.getProjets().subscribe({
    next: (response) => {
      this.projects = response.filter(projet => projet.etudiant_id === this.user_id);
    },
    error: (error) => {
      console.error("Erreur lors de la récupération des projets:", error);
    }
  });
}


  consultProject(id: number): void {
    // Appelle l'API pour récupérer les détails du projet sélectionné
    this.etudiantService.getProjetById(id).subscribe({
      next: (response) => {
        this.selectedProject = response;  // Assigner les données du projet à la variable selectedProject
        localStorage.setItem('projet_selec', this.selectedProject);
        console.log('Projet sélectionné:', this.selectedProject);
      },
      error: (error) => {
        console.error("Erreur lors de la récupération du projet:", error);
      }
    });
  }
}
