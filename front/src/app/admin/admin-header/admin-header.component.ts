import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {

  constructor(private router: Router) {}

  // Define the method to navigate to the home page
  navigateToHome() {
    this.router.navigate(['/home']);  // Replace '/home' with your actual home route
  }

  // Any other methods like logout if needed
}
