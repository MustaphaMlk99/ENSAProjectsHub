import { Component, OnInit } from '@angular/core';

import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { AdminService } from '../admin.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-encadrants',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    AdminHeaderComponent],
  templateUrl: './gestion-encadrants.component.html',
  styleUrl: './gestion-encadrants.component.scss'
})
export class GestionEncadrantsComponent implements OnInit {
    encadrants:any[] = [];  // Tableau pour stocker les encadrants
    filteredEncadrants: any[] = [];  // Tableau pour stocker les encadrants filtrés
    displayedColumns: string[] = ['nom', 'prenom', 'email', 'actions'];  // Colonnes à afficher dans le tableau
  
    constructor(
      private router: Router,
      private adminService: AdminService) {}
  
    ngOnInit(): void {
      this.getEncadrants();  // Récupérer les encadrants au chargement du composant
    }
  
    getEncadrants() {
      this.adminService.getEncadrants().subscribe(data => {
        this.encadrants = data;
        this.filteredEncadrants = data;
      });
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
      this.filteredEncadrants = this.encadrants.filter(encadrant =>
        encadrant.nom.toLowerCase().includes(filterValue) ||
        encadrant.prenom.toLowerCase().includes(filterValue)
      );
    }
  
    addEncadrant() {
      this.router.navigate(['/add_encadrant']); 
    }
  
    editEncadrant(encadrant: any) {
      this.router.navigate(['/modify_encadrant', encadrant.id]);
    }
  
    deleteEncadrant(id: number) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet encadrant ?')) {
        this.adminService.deleteEncadrant(id).subscribe({
          next: () => {
            alert('encadrant supprimé avec succès');
            window.location.reload();
          },
          error: (err) => {
            console.error(err);
            alert('Erreur lors de la suppression de l\'encadrant');
          }
        });
      }    }
  }
  
