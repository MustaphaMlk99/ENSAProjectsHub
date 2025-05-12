import { Component, OnInit } from '@angular/core';

import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { AdminService } from '../admin.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

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
  
    constructor(
      private router: Router,
      private adminService: AdminService) {}
  
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
  
    addEtudiant() {
      this.router.navigate(['/add_etudiant']); 
    }
  
    editEtudiant(etudiant: any): void {
      this.router.navigate(['/modify_etudiant', etudiant.id]);
    }
  
    deleteEtudiant(id: number): void {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
        this.adminService.deleteEtudiant(id).subscribe({
          next: () => {
            alert('Étudiant supprimé avec succès');
            window.location.reload();
          },
          error: (err) => {
            console.error(err);
            alert('Erreur lors de la suppression de l\'étudiant');
          }
        });
      }
    }
    
  }
  

