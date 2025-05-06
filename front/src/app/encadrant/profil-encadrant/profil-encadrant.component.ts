import { Component } from '@angular/core';
import { EncadrantService } from '../encadrant.service';
import { EncadrantHeaderComponent } from '../encadrant-header/encadrant-header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil-encadrant',
  imports: [    
    EncadrantHeaderComponent,
    CommonModule
  ],
  templateUrl: './profil-encadrant.component.html',
  styleUrl: './profil-encadrant.component.scss'
})
export class ProfilEncadrantComponent {

userId: number | null = null;
  encadrant: any = null;




  constructor(    
    private encadrantService: EncadrantService
  ) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('id_user');
    this.userId = storedId ? parseInt(storedId, 10) : null;
    console.log('Données de l’étudiant :', this.userId);


    if (this.userId) {
      this.encadrantService.getEncadrantById(this.userId).subscribe(
        (data) => {
          this.encadrant = data;
          console.log('Données de l’étudiant :', this.encadrant);
        },
        (error) => {
          console.error('Erreur lors de la récupération de l’étudiant', error);
        }
      );
    }

  }
}



