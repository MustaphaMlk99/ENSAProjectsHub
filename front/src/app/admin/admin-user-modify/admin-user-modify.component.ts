import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-user-modify',
  templateUrl: './admin-user-modify.component.html',
  styleUrls: ['./admin-user-modify.component.scss']
})
export class AdminUserModifyComponent {
  userName: string = '';
  userEmail: string = '';
  userRole: string = '';


  constructor(
    public dialogRef: MatDialogRef<AdminUserModifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // This will be used to pass data (user info)
  ) {
    // Pre-fill the form if we're editing an existing user
    if (data) {
      this.userName = data.name;
      this.userEmail = data.email;
      this.userRole = data.role;
    }
  }

  saveChanges() {
    // Logic to save changes (e.g., make an API call)
    console.log("User modified:", this.userName, this.userEmail, this.userRole);
    this.dialogRef.close(); // Close the modal dialog
  }

  cancel() {
    this.dialogRef.close(); // Close without saving changes
  }
}
