import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-encadrant',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    AdminHeaderComponent
  ],  templateUrl: './add-encadrant.component.html',
  styleUrl: './add-encadrant.component.scss'
})
export class AddEncadrantComponent implements OnInit {
  encadrantForm!: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.encadrantForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mot_de_passe: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submitForm(): void {
    if (this.encadrantForm.valid) {
      this.adminService.createEncadrant(this.encadrantForm.value).subscribe({
        next: response => {
          alert('Encadarant ajouté avec succès');
          this.encadrantForm.reset();
          // Rediriger vers une autre page après le succès
          this.router.navigate(['/admin_home']);
        },
        error: err => {
          console.error(err);
          alert("Erreur lors de l'ajout de l'encadrant, e-mail déjà utilisé");
        }
      });
    } else {
      alert('Veuillez remplir correctement tous les champs.');
    }
  }
}

