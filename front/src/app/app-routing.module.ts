import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import the AdminModule
import { AdminModule } from './admin/admin.module';

// Define main app routes
const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  // Add any other routes for other parts of your app here
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
