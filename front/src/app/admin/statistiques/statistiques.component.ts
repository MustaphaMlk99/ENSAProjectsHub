import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss'],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AdminHeaderComponent
  ]
})
export class StatistiquesComponent implements OnInit {
  
  // Define types for the statistics data
  generalStats: any = {};  // This will hold general stats like number of students, admins, etc.
  modulesStats = new MatTableDataSource<any>([]);
  evaluationsStats = new MatTableDataSource<any>([]);
  projetsByEncadrantStats = new MatTableDataSource<any>([]);
  
  // Define column definitions for each table
  moduleColumns: string[] = ['module_id', 'total'];
  evaluationColumns: string[] = ['livrable_id', 'avg_note'];
  encadrantColumns: string[] = ['encadrant_id', 'total'];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadGeneralStats();
    this.loadProjectsByModule();
    this.loadEvaluationsByProject();
    this.loadProjectsByEncadrant();
  }

  // Fetch general statistics (number of students, admins, etc.)
  loadGeneralStats(): void {
    this.adminService.getGeneralStats().subscribe(
      (data: any) => {
        this.generalStats = data;
      },
      (err: any) => {
        console.error('Error loading general stats', err);
      }
    );
  }

  // Fetch statistics related to projects by module
  loadProjectsByModule(): void {
    this.adminService.getProjectsByModule().subscribe(
      (data: any) => {
        this.modulesStats.data = data;
      },
      (err: any) => {
        console.error('Error loading projects by module', err);
      }
    );
  }

  // Fetch statistics related to evaluations by project
  loadEvaluationsByProject(): void {
    this.adminService.getEvaluationsByProject().subscribe(
      (data: any) => {
        this.evaluationsStats.data = data;
      },
      (err: any) => {
        console.error('Error loading evaluations by project', err);
      }
    );
  }

  // Fetch statistics related to projects by encadrant
  loadProjectsByEncadrant(): void {
    this.adminService.getProjectsByEncadrant().subscribe(
      (data: any) => {
        this.projetsByEncadrantStats.data = data;
      },
      (err: any) => {
        console.error('Error loading projects by encadrant', err);
      }
    );
  }
}