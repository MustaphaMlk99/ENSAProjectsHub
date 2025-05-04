import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../etudiant.service';
import { EtudiantHeaderComponent } from '../etudiant-header/etudiant-header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  imports: [
    EtudiantHeaderComponent,
    CommonModule
  ],

})

export class ProfilComponent implements OnInit {
  userId: number | null = null;
  etudiant: any = null;

  constructor(private etudiantService: EtudiantService) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('id_user');
    this.userId = storedId ? parseInt(storedId, 10) : null;
    console.log('Données de l’étudiant :', this.userId);


    if (this.userId) {
      this.etudiantService.getEtudiantById(this.userId).subscribe(
        (data) => {
          this.etudiant = data;
          console.log('Données de l’étudiant :', this.etudiant);
        },
        (error) => {
          console.error('Erreur lors de la récupération de l’étudiant', error);
        }
      );
    }
  }
}
