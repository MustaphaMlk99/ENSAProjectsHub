import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { GestionUtilisateursComponent } from './gestion-utilisateurs/gestion-utilisateurs.component';
import { GestionAdministrateursComponent } from './gestion-administrateurs/gestion-administrateurs.component';
import { GestionEncadrantsComponent } from './gestion-encadrants/gestion-encadrants.component';
import { GestionEtudiantsComponent } from './gestion-etudiants/gestion-etudiants.component';
import { ProjetsComponent } from './projets/projets.component';

const routes: Routes = [
  { path: 'statistiques', component: StatistiquesComponent },
  { path: 'gestion-utilisateurs', component: GestionUtilisateursComponent },
  { path: 'gestion-administrateurs', component: GestionAdministrateursComponent },
  { path: 'gestion-encadrants', component: GestionEncadrantsComponent },
  { path: 'gestion-etudiants', component: GestionEtudiantsComponent },
  { path: 'projets', component: ProjetsComponent },
  // Optional: Redirect to a default route if no match
  { path: '', redirectTo: '/admin/statistiques', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
