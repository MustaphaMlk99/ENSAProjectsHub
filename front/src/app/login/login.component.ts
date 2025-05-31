import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-login',
  standalone: true,
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    const credentials = this.loginForm.value;

    this.http.post<{ token: string; role: string; user: { id: number }}>('http://localhost:8000/api/login', credentials).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('id_user', (response.user.id).toString());
    
        switch (response.role) {
          case 'etudiant':
            this.router.navigate(['/etudiant_home']);
            break;
          case 'admin':
            this.router.navigate(['/admin_home']);
            break;
          case 'encadrant':
            this.router.navigate(['/encadrant_home']);
            break;
          default:
            this.errorMessage = 'Rôle inconnu';
        }
      },
      error: (errorResponse) => {
        this.errorMessage = errorResponse.error?.error || 'Une erreur est survenue.';
        this.isLoading = false;
      }
    });
    
  }
}
