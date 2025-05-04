import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components
import { AdminComponent } from './admin.component'; // Import admin.component
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminProjectsComponent } from './admin-projects/admin-projects.component'; // Import the new Projects component
import { GestionUtilisateursComponent } from './gestion-utilisateurs/gestion-utilisateurs.component';
import { StatisticsComponent } from './statistics/statistics.component'; // Import the new Statistics component
import { FilterProjectsComponent } from './filter-projects/filter-projects.component'; // Import the filter projects component

const routes: Routes = [
  {
    path: '', 
    component: AdminComponent,  // Use AdminComponent as the root for admin routes
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'projets', component: AdminProjectsComponent }, // Add the route for Projects
      { path: 'gestion_utilisateurs', component: GestionUtilisateursComponent },
      { path: 'statistiques', component: StatisticsComponent }, // Add the route for Statistics
      { path: 'filtrage_projets', component: FilterProjectsComponent }, // Add the route for filtering projects
      { path: '', redirectTo: 'statistiques', pathMatch: 'full' } // Default path to Statistiques
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
