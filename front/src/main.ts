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
import { StatistiquesComponent } from './app/admin/statistiques/statistiques.component';
import { GestionAdministrateursComponent } from './app/admin/gestion-administrateurs/gestion-administrateurs.component';
import { GestionEncadrantsComponent } from './app/admin/gestion-encadrants/gestion-encadrants.component';
import { GestionEtudiantsComponent } from './app/admin/gestion-etudiants/gestion-etudiants.component';
import { GestionUtilisateursComponent } from './app/admin/gestion-utilisateurs/gestion-utilisateurs.component';
import { ProjetsComponent } from './app/admin/projets/projets.component';
import { EncadrantService } from './app/encadrant/encadrant.service';
import { AdminService } from './app/admin/admin.service';
import { AddEtudiantComponent } from './app/admin/add-etudiant/add-etudiant.component';
import { AddEncadrantComponent } from './app/admin/add-encadrant/add-encadrant.component';
import { AddAdminComponent } from './app/admin/add-admin/add-admin.component';
import { ModifyEtudiantComponent } from './app/admin/modify-etudiant/modify-etudiant.component';
import { ModifyEncadrantComponent } from './app/admin/modify-encadrant/modify-encadrant.component';
import { ModifyAdminComponent } from './app/admin/modify-admin/modify-admin.component';
import { EvaluerProjetComponent } from './app/encadrant/evaluer-projet/evaluer-projet.component';
import { registerLicense } from '@syncfusion/ej2-base';
import { ProjetEvaluationComponent } from './app/etudiant/projet-evaluation/projet-evaluation.component';
import { EncadrantProjetsComponent } from './app/encadrant/encadrant-projets/encadrant-projets.component';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NNaF1cWWhPYVFzWmFZfVtgcV9GaVZUQWY/P1ZhSXxWdkBhX35ZcH1QTmNeV0R9XUs=');

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
      { path: 'modify_projet/:id', component: ModifyProjetComponent },
      { path: 'historique/:type', component: HistoriqueComponent },
      { path: 'projet_evaluation/:id', component: ProjetEvaluationComponent },
      { path: 'encadrant/projets/:id', component: EncadrantProjetsComponent },
      { path: 'projet/consulter/:id', component: EvaluerProjetComponent },


      { path: 'statistiques', component: StatistiquesComponent },
      { path: 'gestion_utilisateurs', component: GestionUtilisateursComponent },
      { path: 'gestion_administrateurs', component: GestionAdministrateursComponent },
      { path: 'gestion_encadrants', component: GestionEncadrantsComponent },
      { path: 'gestion_etudiants', component: GestionEtudiantsComponent },
      { path: 'projets', component: ProjetsComponent },
      { path: 'add_etudiant', component: AddEtudiantComponent },
      { path: 'add_encadrant', component: AddEncadrantComponent },
      { path: 'add_admin', component: AddAdminComponent },
      { path: 'modify_etudiant/:id', component: ModifyEtudiantComponent },
      { path: 'modify_encadrant/:id', component: ModifyEncadrantComponent },
      { path: 'modify_admin/:id', component: ModifyAdminComponent },
      { path: 'projets/evaluer/:id', component: EvaluerProjetComponent }



    ]),
    EtudiantService,
    EncadrantService,
    AdminService
  ]
});
