import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-encadrant-header',
  templateUrl: './encadrant-header.component.html',
  styleUrl: './encadrant-header.component.scss',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    MatIconModule,
  ]
})
export class EncadrantHeaderComponent {
  constructor(private router: Router) {}

  // Redirige vers la page historique des projets validés
    historique() {
      this.router.navigate(['/projet_valide']);
    }
  
  // Redirige vers la page nouveau projet
    nouveau_projet() {
      this.router.navigate(['/nouveau_projet']);
    }
  
  // Redirige vers la page de connexion
    logout() {
      localStorage.clear(); // supprime tout le localStorage
      this.router.navigate(['/']); 
    }
  }
  