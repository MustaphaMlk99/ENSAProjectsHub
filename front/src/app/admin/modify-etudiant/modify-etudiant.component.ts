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
import { EtudiantService } from '../../etudiant/etudiant.service';

@Component({
  selector: 'app-modify-etudiant',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    AdminHeaderComponent
  ],
  templateUrl: './modify-etudiant.component.html',
  styleUrls: ['./modify-etudiant.component.scss']
})
export class ModifyEtudiantComponent implements OnInit {
  etudiantForm!: FormGroup;
  etudiantId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private adminService: AdminService,
    private etudiantService:EtudiantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.etudiantId = Number(this.route.snapshot.paramMap.get('id'));

    this.etudiantForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      filiere: ['', Validators.required],
      annee: [null, [Validators.required, Validators.min(1), Validators.max(3)]],
      mot_de_passe: [''] // Laisser vide par défaut
    });

    this.etudiantService.getEtudiantById(this.etudiantId).subscribe({
      next: data => this.etudiantForm.patchValue(data),
      error: err => alert("Erreur lors du chargement de l'étudiant")
    });
  }

  submitForm(): void {
    if (this.etudiantForm.valid) {
      this.adminService.updateEtudiant(this.etudiantId, this.etudiantForm.value).subscribe({
        next: () => {
          alert('Étudiant mis à jour avec succès');
          this.router.navigate(['/gestion_etudiants']);
        },
        error: err => {
          console.error(err);
          alert("Erreur lors de la mise à jour de l'étudiant");
        }
      });
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/gestion_etudiants']);
  }
}
