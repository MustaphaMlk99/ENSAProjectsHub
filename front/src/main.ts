import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component';
import { EtudiantHomeComponent } from './app/etudiant/etudiant-home/etudiant-home.component';
import { EncadrantHomeComponent } from './app/encadrant/encadrant-home/encadrant-home.component';
import { AdminHomeComponent } from './app/admin/admin-home/admin-home.component';
import { HistoriqueComponent } from './app/etudiant/historique/historique.component';
import { AddProjetComponent } from './app/etudiant/add-projet/add-projet.component';
import { EtudiantService } from './app/etudiant/etudiant.service';
import { ModifyProjetComponent } from './app/etudiant/modify-projet/modify-projet.component';
import { ProfilComponent } from './app/etudiant/profil/profil.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: LoginComponent },
      { path: 'etudiant_home', component: EtudiantHomeComponent },
      { path: 'encadrant_home', component: EncadrantHomeComponent },
      { path: 'admin_home', component: AdminHomeComponent },
      { path: 'profil', component: ProfilComponent },
      { path: 'historique', component: HistoriqueComponent },
      { path: 'add_projet', component: AddProjetComponent },
      { path: 'modify_projet/:id', component: ModifyProjetComponent }

    ]),
    EtudiantService
  ]
});
