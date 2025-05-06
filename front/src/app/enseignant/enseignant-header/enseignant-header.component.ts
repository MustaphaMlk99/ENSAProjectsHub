import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-enseignant-header',
  templateUrl: './enseignant-header.component.html',
  styleUrl: './enseignant-header.component.scss',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    MatIconModule,

  ]
})
export class EnseignantHeaderComponent {
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
