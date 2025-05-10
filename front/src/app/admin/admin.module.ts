import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

// Charting module
import { NgChartsModule } from 'ng2-charts';

// Components
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
    FormsModule,
    AdminRoutingModule,
    NgChartsModule,
    // Material modules
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    // Components to export
    StatistiquesComponent,
    // Also export Material modules used in exported components
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class AdminModule { }