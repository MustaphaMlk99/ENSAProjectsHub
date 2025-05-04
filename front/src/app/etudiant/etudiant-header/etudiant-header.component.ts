import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-etudiant-header',
  templateUrl: './etudiant-header.component.html',
  styleUrls: ['./etudiant-header.component.scss'], 
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule
  ]
})
export class EtudiantHeaderComponent {
  roles = [
    { id: 1, role: 'admin' },
    { id: 2, role: 'enseignant' },
    { id: 3, role: 'etudiant' }
  ];

  user_id: number | null = null;

  constructor(private router: Router) {}

// Redirige vers la page historique
  historique() {
    this.router.navigate(['/historique']);
  }

// Redirige vers la page ajouter projet
  add_projet() {
    this.router.navigate(['/add_projet']);
  }

// Redirige vers la page de connexion
  logout() {
    localStorage.clear(); // supprime tout le localStorage
    this.router.navigate(['/']); 
  }
}
