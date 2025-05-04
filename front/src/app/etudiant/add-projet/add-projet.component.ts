import { Component } from '@angular/core';
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
    MatProgressBarModule
  ]
})
export class AddProjetComponent {
  projetForm: FormGroup;
  livrableForm: FormGroup;
  user_id: number | null = null;
  public encadrants: any[] = [];
  public modules: any[] = [];

  livrables: {
    rapport: File | null;
    presentation: File | null;
    codeSource: File | null;
  } = {
    rapport: null,
    presentation: null,
    codeSource: null
  };

  constructor(private fb: FormBuilder, private router: Router, private etudiantService: EtudiantService) {
    const storedId = localStorage.getItem('id_user');
    this.user_id = storedId ? parseInt(storedId, 10) : null;

    this.projetForm = this.fb.group({
      titre: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', [Validators.required, Validators.maxLength(2000)]],
      etudiant_id: [this.user_id, Validators.required],
      encadrant_id: ['', Validators.required],
      module_id: ['', Validators.required]
    });

    this.livrableForm = this.fb.group({
      rapport: [null, Validators.required],
      presentation: [null, Validators.required],
      codeSource: [null, Validators.required]
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
    const file = event.target.files[0];
    if (file) {
      this.livrables[type] = file;
      this.livrableForm.get(type)?.setValue(file);
    }
  }

  onSubmit() {
    if (this.projetForm.valid && this.livrableForm.valid) {
      const formData = new FormData();
      console.log("projetForm ", this.projetForm.value);
      // Ajouter les champs du projet
      Object.entries(this.projetForm.value).forEach(([key, value]) => {
        console.log("key", key, value);
        formData.append(key, value as any);
      });

      // Ajouter les fichiers (BLOBs)
      if (this.livrables.rapport) {
        formData.append('rapport', this.livrables.rapport);
      }
      if (this.livrables.presentation) {
        formData.append('presentation', this.livrables.presentation);
      }
      if (this.livrables.codeSource) {
        formData.append('codeSource', this.livrables.codeSource);
      }
      formData.forEach((value, key) => {
        console.log("FormData contains:", key, value); // Vérifiez tout ce qui est dans formData
      });
      this.etudiantService.ajouterProjetAvecLivrables(formData).subscribe({
        next: (response) => {
          alert("Projet ajouté avec succès !");
          this.router.navigate(['/historique']);
        },
        error: (error) => {
          alert("Erreur lors de l'ajout du projet.");
          console.error("Erreur lors de l'ajout :", error);
        }
      });
    } else {
      alert("Veuillez remplir correctement les deux étapes du formulaire.");
    }
  }
  

  annuler() {
    this.router.navigate(['/etudiant_home']);
  }
}
