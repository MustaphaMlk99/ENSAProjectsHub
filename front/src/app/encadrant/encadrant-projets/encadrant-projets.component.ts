import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EncadrantHeaderComponent } from '../encadrant-header/encadrant-header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EncadrantService } from '../encadrant.service';
import { Router, RouterModule } from '@angular/router';
import { FilterService, GridModule, PageService, SortService, ToolbarService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-encadrant-projets',
    imports: [
      EncadrantHeaderComponent,
      CommonModule,
      MatCardModule,
      MatButtonModule,
      MatIconModule,
      RouterModule,
    GridModule],
  templateUrl: './encadrant-projets.component.html',
  styleUrl: './encadrant-projets.component.scss',
  standalone: true,
   providers: [SortService, FilterService, PageService, ToolbarService],
})
export class EncadrantProjetsComponent {
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
    this.fetchProjets()
  }

  fetchProjets() {
    this.encadrantService.getProjetsByEncadrant(this.userId).subscribe((data: any[]) => {
      this.projets = data.map(p => ({
      ...p,
      validationStatus: p?.livrable?.evaluation?.note == null
      ? 'Nouveau'
      : p.livrable.evaluation.note >= 12
        ? 'Validé'
        : 'Non validée',
      note: p?.livrable?.evaluation?.note  ?? '-',
      created_at: new Date(p.created_at) ,
      projetEvalue: p?.livrable?.evaluation?.note ?? false,
      etudiant: p?.etudiant.nom + ' ' + p?.etudiant.prenom,
      module: p?.module?.nom
}));

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
