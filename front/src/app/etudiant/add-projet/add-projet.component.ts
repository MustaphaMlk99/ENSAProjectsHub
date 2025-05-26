import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EtudiantService } from '../etudiant.service';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipGrid } from '@angular/material/chips';


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
    MatSelectModule,
    MatStepperModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatChipGrid 
  ]
})
export class AddProjetComponent {
  projetForm: FormGroup;
  livrableForm: FormGroup;
  user_id: number | null = null;
  public encadrants: any[] = [];
  public modules: any[] = [];

  livrables: { [key: string]: File } = {};

   readonly separatorKeysCodes = [ENTER, COMMA] as const;
tags: string[] = [];


  constructor(private fb: FormBuilder, private router: Router, private etudiantService: EtudiantService) {
    const storedId = localStorage.getItem('id_user');
    this.user_id = storedId ? parseInt(storedId, 10) : null;

    this.projetForm = this.fb.group({
      titre: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', [Validators.required, Validators.maxLength(2000)]],
      etudiant_id: [this.user_id, Validators.required],
      encadrant_id: ['', Validators.required],
      module_id: ['', Validators.required],
       tags: [[]] 
    });

    this.livrableForm = this.fb.group({
      rapport: [null],
      presentation: [null],
      codeSource: [null]
    });
  }

  ngOnInit(): void {
    this.etudiantService.getEncadrants().subscribe({
      next: (response) => {
        this.encadrants = response;
      },
      error: (error) => {
        console.error("Erreur lors de la récupération des encadrants:", error);
      }
    });

    this.etudiantService.getModules().subscribe({
      next: (response) => {
        this.modules = response;
      },
      error: (error) => {
        console.error("Erreur lors de la récupération des modules:", error);
      }
    });
  }


  onFileSelected(event: any, type: 'rapport' | 'presentation' | 'codeSource') {
    const file: File = event.target.files[0];
    if (file) {
      this.livrables[type] = file;
      this.livrableForm.get(type)?.setValue(file.name); // juste pour affichage
    }
  }

  addTag(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
      this.projetForm.get('tags')?.setValue(this.tags);
    }
    if (event.input) {
      event.input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.projetForm.get('tags')?.setValue(this.tags);
    }
  }
 

  onSubmit() {
     const livrablesAjoutes = Object.values(this.livrables).filter(fichier => fichier !== undefined);
  if (livrablesAjoutes.length === 0) {
    alert('Veuillez ajouter au moins un livrable (rapport, présentation ou code source).');
    return;
  }

    if (this.projetForm.valid && this.livrableForm.valid) {
      const formData = new FormData();
  
      // Ajouter les champs du projet
      Object.entries(this.projetForm.value).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
  
      // Ajouter les fichiers livrables
      ['rapport', 'presentation', 'codeSource'].forEach((type) => {
        if (this.livrables[type]) {
          formData.append(type, this.livrables[type]);
        }
      });

      console.log(this.projetForm);

      formData.append('tags', JSON.stringify(this.tags)); 
  
      this.etudiantService.ajouterProjetAvecLivrables(formData).subscribe({
        next: (response) => {
          alert('Projet ajouté avec succès !');
          this.router.navigate(['/historique']);
        },
        error: (error) => {
          alert('Erreur lors de l\'ajout du projet.');
          console.error('Erreur lors de l\'ajout :', error);
        }
      });
    } else {
      alert('Veuillez remplir correctement les deux étapes du formulaire.');
    }
  }
  
  

  annuler() {
    this.router.navigate(['/etudiant_home']);
  }
}
