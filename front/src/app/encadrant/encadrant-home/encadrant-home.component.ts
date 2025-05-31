import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GridModule, FilterService, PageService, SortService, ToolbarService } from '@syncfusion/ej2-angular-grids';

import { EncadrantService } from '../encadrant.service';
import { EncadrantHeaderComponent } from '../encadrant-header/encadrant-header.component';

@Component({
  selector: 'app-encadrant-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    GridModule,
    EncadrantHeaderComponent,
  ],
  templateUrl: './encadrant-home.component.html',
  styleUrl: './encadrant-home.component.scss',
  providers: [SortService, FilterService, PageService, ToolbarService],
})
export class EncadrantHomeComponent implements OnInit {
  projets: any[] = [];
  userId: number = 1; // Par défaut
  likedProjects: number[] = [];

  constructor(
    private router: Router,
    private encadrantService: EncadrantService
  ) {
    const storedId = localStorage.getItem('id_user');
    this.userId = storedId ? parseInt(storedId, 10) : 0;
    console.log('ID utilisateur connecté :', this.userId);
  }

  ngOnInit(): void {
    this.fetchProjets();
  }

  fetchProjets(): void {
    this.encadrantService.getProjets().subscribe((data: any[]) => {
      const projetsEvalues = data
        .map(p => ({
          ...p,
          validationStatus: p?.livrable?.evaluation?.note == null
            ? 'Nouveau'
            : p.livrable.evaluation.note >= 12
              ? 'Validé'
              : 'Non validée',
          note: p?.livrable?.evaluation?.note ?? '-',
          created_at: new Date(p.created_at),
          projetEvalue: p?.livrable?.evaluation?.note != null,
          etudiant: p?.etudiant?.nom + ' ' + p?.etudiant?.prenom,
          module: p?.module?.nom,
          encadrant: p?.encadrant?.nom + ' ' + p?.encadrant?.prenom,
        }))
        .filter(p => p.projetEvalue);

      this.projets = projetsEvalues;

      // Charger les likes après avoir filtré
      this.projets.forEach(projet => {
        this.encadrantService.getLikesCount(projet.id).subscribe((response) => {
          projet.likesCount = response.likes;
        });
      });
    });
  }
}
