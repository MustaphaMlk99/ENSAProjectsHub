import { Component, OnInit } from '@angular/core';
import { EtudiantHeaderComponent } from '../etudiant-header/etudiant-header.component';
import { CommonModule } from '@angular/common';
import { EtudiantService } from '../etudiant.service';

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
  public projetCount: number = 0;
  totalLikesReceived: number = 0;
  mostLikedProjetTitre: string = '';
  mostLikedProjetLikes: number = 0;



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

      this.etudiantService.getLikesReceivedByEtudiant(this.userId).subscribe({
        next: (res) => this.totalLikesReceived = res.likes_received,
        error: (err) => console.error('Erreur lors du chargement des j\'aime reçus', err)
      });

      this.etudiantService.getMostLikedProjet(this.userId).subscribe({
        next: (res) => {
          this.mostLikedProjetTitre = res.titre;
          this.mostLikedProjetLikes = res.likes;
        },
        error: (err) => console.error("Erreur projet le plus liké :", err)
      });
      
    }

    //Récupération des projets pour compter ceux de l'étudiant connecté
    this.etudiantService.getProjets().subscribe(
      (projets) => {
        const projetsEtudiant = projets.filter(p => p.etudiant_id === this.userId);
        this.projetCount = projetsEtudiant.length;
        console.log('Nombre de projets de l’étudiant :', this.projetCount);
      },
      (error) => {
        console.error('Erreur lors de la récupération des projets', error);
      }
    );
  }
}
