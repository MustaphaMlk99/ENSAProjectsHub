import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { EncadrantService } from '../../encadrant/encadrant.service';

@Component({
  selector: 'app-modify-admin',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    AdminHeaderComponent
  ],
  templateUrl: './modify-admin.component.html',
  styleUrl: './modify-admin.component.scss'
})
export class ModifyAdminComponent implements OnInit {

  adminForm!: FormGroup;
  amdinId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.amdinId = Number(this.route.snapshot.paramMap.get('id'));

    this.adminForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mot_de_passe: [''] 
    });

    this.adminService.getAdminById(this.amdinId).subscribe({
      next: data => this.adminForm.patchValue(data),
      error: err => alert("Erreur lors du chargement de l'administrateur")
    });
  }

  submitForm(): void {
    if (this.adminForm.valid) {
      this.adminService.updateAdmin(this.amdinId, this.adminForm.value).subscribe({
        next: () => {
          alert('administrateur mis à jour avec succès');
          this.router.navigate(['/gestion_administrateurs']);
        },
        error: err => {
          console.error(err);
          alert("Erreur lors de la mise à jour de l'administrateur");
        }
      });
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/gestion_administrateurs']);
  }

}

