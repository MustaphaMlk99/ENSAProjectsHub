import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EtudiantService } from '../etudiant.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-projet',
  standalone: true,
  templateUrl: './add-projet.component.html',
  styleUrls: ['./add-projet.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class AddProjetComponent {
  projetForm: FormGroup;
  user_id: number | null = null;
  public encadrants: any;
  public modules: any;


  
  constructor(private fb: FormBuilder, private router: Router,private etudiantService: EtudiantService) {
    const storedId = localStorage.getItem('id_user');
    this.user_id = storedId ? parseInt(storedId, 10) : null;
    //console.log('ID utilisateur connecté :', this.user_id);

    this.projetForm = this.fb.group({
      titre: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', [Validators.required, Validators.maxLength(2000)]],
      etudiant_id: [this.user_id, Validators.required],
      encadrant_id: ['', Validators.required],
      module_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.etudiantService.getEncadrants().subscribe({
      next: (response) => {
        this.encadrants = response; 
        //console.log('Liste des encadrants :', this.encadrants);
      },
      error: (error) => {
        console.error("Erreur lors de la récupération des encadrants:", error);
      }
    });

    this.etudiantService.getModules().subscribe({
      next: (response) => {
        this.modules = response; 
        //console.log('Liste des encadrants :', this.modules);
      },
      error: (error) => {
        console.error("Erreur lors de la récupération des encadrants:", error);
      }
    });
  }

  onSubmit() {
    if (this.projetForm.valid) {
      //console.log('Projet ajouté :', this.projetForm.value);
      
      // Appel au service pour ajouter le projet
      this.etudiantService.ajouterProjet(this.projetForm.value).subscribe({
        next: (response) => {
          //console.log('Projet ajouté avec succès:', response);
          this.router.navigate(['/historique']);
        },
        error: (error) => {
          alert("Erreur lors de l\'ajout du projet.");
          console.error('Erreur lors de l\'ajout du projet :', error);
          // Vous pouvez afficher un message d'erreur à l'utilisateur ici
        }
      });
    } else {
      alert("Le formulaire n'est pas valide.");
      console.log('Le formulaire n\'est pas valide.');
    }
  }

  annuler() {
    this.router.navigate(['/etudiant_home']);
  }
}
