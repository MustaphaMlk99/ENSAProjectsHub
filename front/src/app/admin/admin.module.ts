import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Import Components
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminProjectsComponent } from './admin-projects/admin-projects.component';
import { GestionUtilisateursComponent } from './gestion-utilisateurs/gestion-utilisateurs.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component'; // Assuming your header is in this folder

// Define Routes for Admin
const routes: Routes = [
  {
    path: '',
    component: AdminHeaderComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'projets', component: AdminProjectsComponent },
      { path: 'gestion_utilisateurs', component: GestionUtilisateursComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminProjectsComponent,
    GestionUtilisateursComponent,
    AdminHeaderComponent, // Declare your admin header component here
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // Import the routing for this module
    // Any other Angular Material modules you may need
  ],
  exports: [RouterModule] // Export RouterModule to allow routing in this module
})
export class AdminModule {}

