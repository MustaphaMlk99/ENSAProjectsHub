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
  selector: 'app-modify-encadrant',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    AdminHeaderComponent
  ],
  templateUrl: './modify-encadrant.component.html',
  styleUrl: './modify-encadrant.component.scss'
})
export class ModifyEncadrantComponent implements OnInit {
  encadrantForm!: FormGroup;
  encadrantId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private adminService: AdminService,
    private encadrantService:EncadrantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.encadrantId = Number(this.route.snapshot.paramMap.get('id'));

    this.encadrantForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mot_de_passe: [''] 
    });

    this.encadrantService.getEncadrantById(this.encadrantId).subscribe({
      next: data => this.encadrantForm.patchValue(data),
      error: err => alert("Erreur lors du chargement de l'encadrant")
    });
  }

  submitForm(): void {
    if (this.encadrantForm.valid) {
      this.adminService.updateEncadrant(this.encadrantId, this.encadrantForm.value).subscribe({
        next: () => {
          alert('encadrant mis à jour avec succès');
          this.router.navigate(['/gestion_encadrants']);
        },
        error: err => {
          console.error(err);
          alert("Erreur lors de la mise à jour de l'encadrant");
        }
      });
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/gestion_encadrants']);
  }

}
