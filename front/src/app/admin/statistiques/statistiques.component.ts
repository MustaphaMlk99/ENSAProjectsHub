import { Component, OnInit } from '@angular/core';
import { StatistiquesService } from '../services/statistiques.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss']
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

  constructor(private statistiquesService: StatistiquesService) {}

  ngOnInit(): void {
    this.loadGeneralStats();
    this.loadProjectsByModule();
    this.loadEvaluationsByProject();
    this.loadProjectsByEncadrant();
  }

  // Fetch general statistics (number of students, admins, etc.)
  loadGeneralStats(): void {
    this.statistiquesService.getGeneralStats().subscribe(
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
    this.statistiquesService.getProjectsByModule().subscribe(
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
    this.statistiquesService.getEvaluationsByProject().subscribe(
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
    this.statistiquesService.getProjectsByEncadrant().subscribe(
      (data: any) => {
        this.projetsByEncadrantStats.data = data;
      },
      (err: any) => {
        console.error('Error loading projects by encadrant', err);
      }
    );
  }
}