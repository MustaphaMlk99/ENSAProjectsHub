import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-admin-header',
  standalone: true,
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule
  ]
})


export class AdminHeaderComponent {
  roles = [
    { id: 1, role: 'admin' },
    { id: 2, role: 'encadrant' },
    { id: 3, role: 'etudiant' }
  ];

  constructor(private router: Router) {}

  // Méthode de déconnexion
  logout() {
    // Logique de déconnexion (ex: redirection, appel d'API, etc.)
    this.router.navigate(['/']); // Redirige vers la page de connexion
  }
}
