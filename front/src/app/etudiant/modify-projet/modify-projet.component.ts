import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EtudiantService } from '../etudiant.service';

@Component({
  selector: 'app-modify-projet',
  standalone: true,
  templateUrl: './modify-projet.component.html',
  styleUrls: ['./modify-projet.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ModifyProjetComponent implements OnInit {
  projetForm: FormGroup;
  selectedProject: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private etudiantService: EtudiantService
  ) {
    const storedProject = localStorage.getItem('projet_selec');
    this.selectedProject = storedProject ? JSON.parse(storedProject) : null;

    this.projetForm = this.fb.group({
      titre: [this.selectedProject?.titre || '', [Validators.required, Validators.maxLength(150)]],
      description: [this.selectedProject?.description || '', [Validators.required, Validators.maxLength(2000)]],
      etudiant_id: [this.selectedProject?.etudiant_id || '', Validators.required],
      encadrant_id: [this.selectedProject?.encadrant_id || '', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.projetForm.valid) {
      const updatedProjet = { id: this.selectedProject.id, ...this.projetForm.value };
      console.log('Projet modifié :', updatedProjet);

      this.etudiantService.updateProjet(updatedProjet).subscribe({
        next: () => {
          localStorage.removeItem('projet_selec');
          this.router.navigate(['/etudiant_home']);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du projet', err);
        }
      });
    }
  }

  annuler() {
    localStorage.removeItem('projet_selec');
    this.router.navigate(['/etudiant_home']);
  }
}
