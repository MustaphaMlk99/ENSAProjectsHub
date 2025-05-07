import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminUserModifyComponent } from '../admin-user-modify/admin-user-modify.component';

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.scss']
})
export class AdminUserManagementComponent implements OnInit {
  users = [
    { username: 'john', email: 'john@example.com', role: 'admin' },
    { username: 'susan', email: 'susan@example.com', role: 'teacher' },
    { username: 'mike', email: 'mike@example.com', role: 'student' }
  ];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {}

  // Open the modal for modifying a user
  modifyUser(user: any): void {
    const dialogRef = this.dialog.open(AdminUserModifyComponent, {
      width: '300px',
      data: { ...user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Here you would update the user in the backend
        const index = this.users.findIndex(u => u.username === result.username);
        if (index !== -1) {
          this.users[index] = result;
        }
      }
    });
  }

  // Open modal to create a new user
  createNewUser(): void {
    // Here we can open a similar modal or a form to create a new user
  }
}
