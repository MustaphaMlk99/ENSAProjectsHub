import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EtudiantService } from '../etudiant.service';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatIconModule } from '@angular/material/icon';
import { MatChipGrid } from '@angular/material/chips';

@Component({
  selector: 'app-modify-projet',
  templateUrl: './modify-projet.component.html',
  styleUrls: ['./modify-projet.component.scss'],
  imports: [
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatChipsModule,
    MatChipGrid ,
    MatIconModule
  ]
})
export class ModifyProjetComponent implements OnInit {
  projetForm: FormGroup;
  selectedProject: any;
  encadrants: any[] = [];
  modules: any[] = [];
  livrables: any = {}; 
  user_id: number | null = null;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private etudiantService: EtudiantService
  ) {
    const storedId = localStorage.getItem('id_user');
    this.user_id = storedId ? parseInt(storedId, 10) : null;
    // Initialisation du formulaire avec des valeurs vides
    this.projetForm = this.fb.group({
      titre: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', [Validators.required, Validators.maxLength(2000)]],
      encadrant_id: ['', Validators.required],
      module_id: ['', Validators.required],
      etudiant_id: [this.user_id, Validators.required],
      tags: [[]] 
    });
  }

  ngOnInit(): void {
    // Récupérer les données depuis le localStorage pour pré-remplir le formulaire
    const storedProject = localStorage.getItem('projet_selec');
    if (storedProject) {
      this.selectedProject = JSON.parse(storedProject);
      console.log("selectedProject ", this.selectedProject);
      this.setFormValues();

      // Extraire juste les mots des tags (le champ 'mot')
    this.tags = (this.selectedProject.tags ?? []).map((tag: any) => tag.mot);

    // Mettre à jour le FormControl tags
    this.projetForm.get('tags')?.setValue(this.tags);
    }

    // Charger les modules et les encadrants depuis l'API
    this.loadModules();
    this.loadEncadrants();
  }

  // Charger les modules depuis l'API
  loadModules(): void {
    this.etudiantService.getModules().subscribe({
      next: (response) => {
        this.modules = response;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des modules', err);
      }
    });
  }

  // Charger les encadrants depuis l'API
  loadEncadrants(): void {
    this.etudiantService.getEncadrants().subscribe({
      next: (response) => {
        this.encadrants = response;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des encadrants', err);
      }
    });
  }

  // Fonction pour pré-remplir les valeurs du formulaire avec les données récupérées
  setFormValues(): void {
    this.projetForm.patchValue({
      titre: this.selectedProject.titre,
      description: this.selectedProject.description,
      encadrant_id: this.selectedProject.encadrant_id,
      module_id: this.selectedProject.module_id
    });
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

  // Fonction pour gérer la sélection des fichiers de livrables
  onFileSelected(event: Event, type: string): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.livrables[type] = file;
  }

  // Fonction appelée lors de la soumission du formulaire
  onSubmit(): void {
    if (this.projetForm.valid) {
      // Créer le formData avec les données du projet et les livrables (fichiers)
      const formData = new FormData();
      console.log(formData, this.selectedProject.id);

      // Ajouter les champs du projet au formData
      Object.entries(this.projetForm.value).forEach(([key, value]) => {
        formData.append(key, value as any);
      });
      console.log(formData, this.selectedProject.id);

      // Ajouter les fichiers des livrables (si présents)
      if (this.livrables.rapport) formData.append('rapport', this.livrables.rapport);
      if (this.livrables.presentation) formData.append('presentation', this.livrables.presentation);
      if (this.livrables.codeSource) formData.append('codeSource', this.livrables.codeSource);

      formData.append('tags', JSON.stringify(this.tags)); 

      // Appeler la méthode updateProjetAvecLivrables pour mettre à jour le projet et ses livrables
      this.etudiantService.updateProjetAvecLivrables(formData, this.selectedProject.id).subscribe({
        next: () => {

          // Retirer le projet sélectionné du localStorage et rediriger l'utilisateur
          localStorage.removeItem('projet_selec');
          this.router.navigate(['/etudiant_home']);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du projet :', err);
        }
      });
    } else {
      console.log("Le formulaire n'est pas valide");
    }
  }

  // Fonction pour annuler et retourner à la page d'accueil
  annuler(): void {
    localStorage.removeItem('projet_selec');
    this.router.navigate(['/etudiant_home']);
  }
}
