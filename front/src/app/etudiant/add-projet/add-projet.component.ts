import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule
  ]
})
export class AddProjetComponent {
  projetForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.projetForm = this.fb.group({
      titre: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', [Validators.required, Validators.maxLength(2000)]],
      etudiant_id: ['', Validators.required],
      encadrant_id: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.projetForm.valid) {
      console.log('Projet ajouté :', this.projetForm.value);
      // logique API ou service à ajouter ici
    }
  }

  annuler() {
    this.router.navigate(['/etudiant_home']);
  }
}
