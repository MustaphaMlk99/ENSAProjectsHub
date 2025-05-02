import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component';
import { EtudiantHomeComponent } from './app/etudiant/etudiant-home/etudiant-home.component';
import { EnseignantHomeComponent } from './app/enseignant/enseignant-home/enseignant-home.component';
import { AdminHomeComponent } from './app/admin/admin-home/admin-home.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: LoginComponent },
      { path: 'etudiant_home', component: EtudiantHomeComponent },
      { path: 'enseignant_home', component: EnseignantHomeComponent },
      { path: 'admin_home', component: AdminHomeComponent }
    ])
  ]
});
