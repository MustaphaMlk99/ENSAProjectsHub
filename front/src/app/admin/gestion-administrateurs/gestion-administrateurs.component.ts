import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { AdminService } from '../admin.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-administrateurs',
  imports: [   
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    AdminHeaderComponent],
  templateUrl: './gestion-administrateurs.component.html',
  styleUrl: './gestion-administrateurs.component.scss'
})
export class GestionAdministrateursComponent implements OnInit{
  admins: any[] = [];
  filteredAdmins: any[] = [];
  displayedColumns: string[] = ['nom', 'prenom', 'email', 'actions'];

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins(): void {
    this.adminService.getAdmins().subscribe(data => {
      this.admins = data;
      this.filteredAdmins = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredAdmins = this.admins.filter(admin =>
      admin.nom.toLowerCase().includes(filterValue) ||
      admin.prenom.toLowerCase().includes(filterValue) 
    );
  }

  addAdmin() {
    this.router.navigate(['/add_admin']); 
  }

  editAdmin(admin: any) {
    this.router.navigate(['/modify_admin', admin.id]);
  }

  deleteAdmin(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet administrateur ?')) {
      this.adminService.deleteAdmin(id).subscribe({
        next: () => {
          alert('administrateur supprimé avec succès');
          window.location.reload();
        },
        error: (err) => {
          console.error(err);
          alert('Erreur lors de la suppression de l\'administrateur');
        }
      });
    }  }
}