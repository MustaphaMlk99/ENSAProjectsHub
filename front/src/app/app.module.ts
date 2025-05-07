import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module'; // Import AdminModule
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    AdminModule, // Add AdminModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
