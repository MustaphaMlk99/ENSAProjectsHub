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
  selector: 'app-add-admin',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    AdminHeaderComponent
  ],  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.scss'
})
export class AddAdminComponent implements OnInit{

  adminForm!: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.adminForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mot_de_passe: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submitForm(): void {
    if (this.adminForm.valid) {
      this.adminService.createAdmin(this.adminForm.value).subscribe({
        next: response => {
          alert('Administrateur ajouté avec succès');
          this.adminForm.reset();
          // Rediriger vers une autre page après le succès
          this.router.navigate(['/admin_home']);
        },
        error: err => {
          console.error(err);
          alert("Erreur lors de l'ajout de l'administrateur, e-mail déjà utilisé");
        }
      });
    } else {
      alert('Veuillez remplir correctement tous les champs.');
    }
  }
}
