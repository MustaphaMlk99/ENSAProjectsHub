import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Import your routing module and components
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { GestionUtilisateursComponent } from './gestion-utilisateurs/gestion-utilisateurs.component';
import { GestionAdministrateursComponent } from './gestion-administrateurs/gestion-administrateurs.component';
import { GestionEncadrantsComponent } from './gestion-encadrants/gestion-encadrants.component';
import { GestionEtudiantsComponent } from './gestion-etudiants/gestion-etudiants.component';
import { ProjetsComponent } from './projets/projets.component';

@NgModule({
  declarations: [
    AdminHeaderComponent,
    StatistiquesComponent,
    GestionUtilisateursComponent,
    GestionAdministrateursComponent,
    GestionEncadrantsComponent,
    GestionEtudiantsComponent,
    ProjetsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,  // Import the routing module
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    MatToolbarModule
  ]
})
export class AdminModule { }