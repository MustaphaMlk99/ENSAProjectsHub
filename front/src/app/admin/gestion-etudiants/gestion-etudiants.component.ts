import { Component, OnInit } from '@angular/core';

import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { AdminService } from '../admin.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-gestion-etudiants',
  imports: [MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    AdminHeaderComponent
  ],
  templateUrl: './gestion-etudiants.component.html',
  styleUrl: './gestion-etudiants.component.scss'
})
export class GestionEtudiantsComponent {

encadrants:any[] = [];  // Tableau pour stocker les encadrants
    filteredEncadrants: any[] = [];  // Tableau pour stocker les encadrants filtrés
    displayedColumns: string[] = ['nom', 'prenom', 'email', 'actions'];  // Colonnes à afficher dans le tableau
  
    constructor(private adminService: AdminService) {}
  
    ngOnInit(): void {
      this.getEtudiants();  // Récupérer les encadrants au chargement du composant
    }
  
    getEtudiants() {
      this.adminService.getEtudiants().subscribe(data => {
        this.encadrants = data;
        this.filteredEncadrants = data;
      });
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
      this.filteredEncadrants = this.encadrants.filter(etudiant =>
        etudiant.nom.toLowerCase().includes(filterValue) ||
        etudiant.prenom.toLowerCase().includes(filterValue)
      );
    }
  
    addEncadrant() {
      // Implémenter l'ouverture du dialog pour créer un etudiant
    }
  
    editEncadrant(etudiant: any) {
      // Implémenter la méthode de modification de l'etudiant
    }
  
    deleteEncadrant(id: number) {
      // Implémenter la méthode de suppression d'un etudiant
    }
  }
  

