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
  selector: 'app-add-etudiant',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    AdminHeaderComponent
  ],
  templateUrl: './add-etudiant.component.html',
  styleUrls: ['./add-etudiant.component.scss']
})
export class AddEtudiantComponent implements OnInit {
  etudiantForm!: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.etudiantForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      filiere: ['', Validators.required],
      annee: [null, [Validators.required, Validators.min(1), Validators.max(3)]],
      mot_de_passe: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submitForm(): void {
    if (this.etudiantForm.valid) {
      this.adminService.createEtudiant(this.etudiantForm.value).subscribe({
        next: response => {
          alert('Étudiant ajouté avec succès');
          this.etudiantForm.reset();
          // Rediriger vers une autre page après le succès
          this.router.navigate(['/admin_home']);
        },
        error: err => {
          console.error(err);
          alert("Erreur lors de l'ajout de l'étudiant, e-mail déjà utilisé");
        }
      });
    } else {
      alert('Veuillez remplir correctement tous les champs.');
    }
  }
}
