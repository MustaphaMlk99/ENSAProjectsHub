import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-etudiant-header',
  templateUrl: './etudiant-header.component.html',
  styleUrl: './etudiant-header.component.scss',
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
  constructor(private router: Router) {}


  historique(){
    this.router.navigate(['/historique']);
  }

  add_projet(){
    this.router.navigate(['/add_projet']);
  }

  // Méthode de déconnexion
  logout() {
    // Logique de déconnexion (ex: redirection, appel d'API, etc.)
    this.router.navigate(['/']); // Redirige vers la page de connexion
  }

}
