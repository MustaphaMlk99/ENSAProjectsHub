import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EtudiantHeaderComponent } from '../etudiant-header/etudiant-header.component';
import { EtudiantService } from '../etudiant.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatChipGrid } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.scss',
  imports: [    
  EtudiantHeaderComponent,
  CommonModule, 
  MatCardModule, 
  MatButtonModule, 
  MatChipGrid,
  FormsModule]
})
export class HistoriqueComponent {
  user_id: number | null = null;
  public projects: any;
  selectedProject: any = null;
  searchType: 'etudiant' | 'module' | 'tag' = 'etudiant';
  searchTerm: string = '';
  filteredProjects: any[] = [];

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
      this.filteredProjects = [...this.projects]; // initialisation

    },
    error: (error) => {
      console.error("Erreur lors de la récupération des projets:", error);
    }
  });
}

filterProjects(): void {
  const term = this.searchTerm.trim().toLowerCase();

  if (!term) {
    this.filteredProjects = [...this.projects];
    return;
  }

  this.filteredProjects = this.projects.filter((project: any) => {
    console.log("project ", project);
    if (this.searchType === 'etudiant') {
      return project?.etudiant.nom?.toLowerCase().includes(term) || project?.etudiant?.prenom?.toLowerCase().includes(term);
    }

    if (this.searchType === 'module') {
      return project?.module?.nom.toLowerCase().includes(term);
    }

    if (this.searchType === 'tag') {
      return project.tags?.some((tag: any) => tag.mot.toLowerCase().includes(term));
    }

    return false;
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

  viewEvaluation(id: number): void {
    // Stocker temporairement ou naviguer directement
    this.router.navigate(['/projet_evaluation', id]);
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
