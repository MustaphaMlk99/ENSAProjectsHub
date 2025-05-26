import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Add this line

import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';

// Material modules
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { MatChipsModule } from '@angular/material/chips';
import { MatChipGrid } from '@angular/material/chips';

//Syncfusion
import { GridModule } from '@syncfusion/ej2-angular-grids';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Add this line
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AdminModule,
    GridModule,
    MatChipsModule,
    MatChipGrid
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }