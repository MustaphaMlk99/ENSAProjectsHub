import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EtudiantHeaderComponent } from '../etudiant-header/etudiant-header.component';
import { EtudiantService } from '../etudiant.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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

constructor(
  private router: Router,
  private etudiantService: EtudiantService,
  private route: ActivatedRoute
) {
  const storedId = localStorage.getItem('id_user');
  this.user_id = storedId ? parseInt(storedId, 10) : null;

  console.log('ID utilisateur connecté :', this.user_id);
}

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.loadData(params['type']); // ou params.get('type') selon la version
  });
}

loadData(type: string) {
  console.log("type ", type);
  this.etudiantService.getProjets().subscribe({
    next: (response) => {
      if(type === 'mes-projets') {
        this.projects = response.filter(projet => projet.etudiant_id === this.user_id);
      } else {
        this.projects = response;
      }

    },
    error: (error) => {
      console.error("Erreur lors de la récupération des projets:", error);
    }
  });
}


modifyProjet(id: number): void {
    // Appelle l'API pour récupérer les détails du projet sélectionné
    this.etudiantService.getProjetById(id).subscribe({
      next: (response) => {
        this.selectedProject = response;  // Assigner les données du projet à la variable selectedProject
        localStorage.setItem('projet_selec', JSON.stringify(this.selectedProject)); 
        console.log('Projet sélectionné:', this.selectedProject);
        this.router.navigate(['/modify_projet', id]);

      },
      error: (error) => {
        console.error("Erreur lors de la récupération du projet:", error);
      }
    });
  }

  deleteProjet(id: number): void {
    // Appeler le service pour supprimer le projet
    this.etudiantService.deleteProjet(id).subscribe({
      next: (response) => {
        console.log('Projet supprimé avec succès:', response);
        // Actualiser la liste des projets après suppression
        window.location.reload();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du projet:', error);
        alert('Erreur lors de la suppression du projet.');
      }
    });
  }

}
