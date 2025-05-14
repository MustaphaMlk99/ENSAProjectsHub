import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../admin.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss'],
  standalone: true,
  imports: []
})
export class StatistiquesComponent implements OnInit {

  generalStats: any = {};
  modulesStats = new MatTableDataSource<any>([]);
  evaluationsStats = new MatTableDataSource<any>([]);
  projetsByEncadrantStats = new MatTableDataSource<any>([]);

  charts: { [key: string]: Chart | null } = {
    projectsByModule: null,
    submissionRates: null,
    evaluationDistribution: null,
    likesVsEvaluations: null,
    encadrantWorkload: null,
    studentFunnel: null,
    userRegistrations: null,
    modulePopularity: null,
    topProjects: null,
    submissionDelays: null
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadGeneralStats();
    this.loadProjectsByModule();
    this.loadEvaluationsByProject();
    this.loadProjectsByEncadrant();
    this.initAllCharts();
  }

  loadGeneralStats(): void {
    this.adminService.getGeneralStats().subscribe(data => {
      this.generalStats = data;
    });
  }

  loadProjectsByModule(): void {
    this.adminService.getProjectsByModule().subscribe((data: any[]) => {
      this.modulesStats.data = data;
    });
  }

  loadEvaluationsByProject(): void {
    this.adminService.getEvaluationsByProject().subscribe((data: any[]) => {
      this.evaluationsStats.data = data;
    });
  }

  loadProjectsByEncadrant(): void {
    this.adminService.getProjectsByEncadrant().subscribe((data: any[]) => {
      this.projetsByEncadrantStats.data = data;
    });
  }

  initAllCharts(): void {
    this.adminService.getProjectsByModule().subscribe((data: any[]) => {
      const labels = data.map(d => d.nom_module);
      const values = data.map(d => d.total);
      this.charts['projectsByModule'] = this.createBarChart('projectsByModuleChart', labels, values, 'Projects per Module');
    });

    this.adminService.getSubmissionRates().subscribe((data: any[]) => {
      const labels = data.map(d => d.date);
      const values = data.map(d => d.total);
      this.charts['submissionRates'] = this.createLineChart('submissionRatesChart', labels, values, 'Submissions');
    });

    this.adminService.getEvaluationDistribution().subscribe((data: any[]) => {
      const labels = data.map(d => d.note);
      const values = data.map(d => d.total);
      this.charts['evaluationDistribution'] = this.createBarChart('evaluationDistributionChart', labels, values, 'Evaluations');
    });

    this.adminService.getLikesVsEvaluations().subscribe((data: any[]) => {
      const labels = data.map(d => d.projet_id);
      const x = data.map(d => d.total_likes);
      const y = data.map(d => d.note);
      this.charts['likesVsEvaluations'] = this.createScatterChart('likesVsEvaluationsChart', labels, x, y);
    });

    this.adminService.getEncadrantWorkload().subscribe((data: any[]) => {
      const labels = data.map(d => `${d.nom} ${d.prenom}`);
      const values = data.map(d => d.total_projects);
      this.charts['encadrantWorkload'] = this.createHorizontalBarChart('encadrantWorkloadChart', labels, values);
    });

    this.adminService.getStudentEngagement().subscribe((data: any) => {
      const labels = ['Engaged Students', 'Evaluated Projects'];
      const values = [
        data.engaged_students?.[0]?.engaged_students || 0,
        data.evaluated_projects?.[0]?.evaluated_projects || 0
      ];
      this.charts['studentFunnel'] = this.createFunnelChart('studentFunnelChart', labels, values);
    });

    this.adminService.getMonthlyUserRegistrations().subscribe((data: any[]) => {
      const labels = data.map(d => `Month ${d.month}`);
      const values = data.map(d => d.total);
      this.charts['userRegistrations'] = this.createAreaChart('userRegistrationsChart', labels, values);
    });

    this.adminService.getModulePopularityByLikes().subscribe((data: any[]) => {
      const labels = data.map(d => d.nom_module);
      const values = data.map(d => d.total_likes);
      this.charts['modulePopularity'] = this.createStackedBarChart('modulePopularityChart', labels, values);
    });

    this.adminService.getTopRatedProjects().subscribe((data: any[]) => {
      const labels = data.map(d => d.titre);
      const values = data.map(d => d.note);
      this.charts['topProjects'] = this.createBarChart('topProjectsChart', labels, values, 'Top Rated');
    });

    this.adminService.getAvgTimeToFirstSubmission().subscribe((data: any[]) => {
      const avg = Math.round(data?.[0]?.avg_time_hours || 0);
      this.charts['submissionDelays'] = this.createBoxChart('submissionDelaysChart', [avg], 'Avg Submission Time (hours)');
    });
  }

  createBarChart(id: string, labels: string[], data: number[], label: string): Chart {
    return new Chart(id, {
      type: 'bar',
      data: {
        labels,
        datasets: [{ label, data, backgroundColor: '#42a5f5' }]
      },
      options: { responsive: true }
    });
  }

  createLineChart(id: string, labels: string[], data: number[], label: string): Chart {
    return new Chart(id, {
      type: 'line',
      data: {
        labels,
        datasets: [{ label, data, fill: false, borderColor: '#66bb6a' }]
      },
      options: { responsive: true }
    });
  }

  createBoxChart(id: string, data: number[], label: string): Chart {
    return new Chart(id, {
      type: 'bar',
      data: {
        labels: [label],
        datasets: [{ label, data, backgroundColor: '#ffa726' }]
      },
      options: { responsive: true }
    });
  }

  createScatterChart(id: string, labels: any[], x: number[], y: number[]): Chart {
    return new Chart(id, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Likes vs Evaluations',
          data: x.map((val, i) => ({ x: val, y: y[i] })),
          backgroundColor: '#ef5350'
        }]
      },
      options: { responsive: true }
    });
  }

  createHorizontalBarChart(id: string, labels: string[], data: number[]): Chart {
    return new Chart(id, {
      type: 'bar',
      data: {
        labels,
        datasets: [{ label: 'Workload', data, backgroundColor: '#ab47bc' }]
      },
      options: {
        indexAxis: 'y',
        responsive: true
      }
    });
  }

  createFunnelChart(id: string, labels: string[], data: number[]): Chart {
    return this.createBarChart(id, labels, data, 'Funnel Data');
  }

  createAreaChart(id: string, labels: string[], data: number[]): Chart {
    return new Chart(id, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Registrations',
          data,
          fill: true,
          backgroundColor: 'rgba(66,165,245,0.4)',
          borderColor: '#42a5f5'
        }]
      },
      options: { responsive: true }
    });
  }

  createStackedBarChart(id: string, labels: string[], data: number[]): Chart {
    return new Chart(id, {
      type: 'bar',
      data: {
        labels,
        datasets: [{ label: 'Likes', data, backgroundColor: '#26c6da' }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        },
        scales: {
          x: { stacked: true },
          y: { stacked: true }
        }
      }
    });
  }
}