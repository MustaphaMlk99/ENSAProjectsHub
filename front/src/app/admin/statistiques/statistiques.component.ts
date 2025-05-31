import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../admin.service';
import { Chart, registerables } from 'chart.js';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss'],
  standalone: true,
  imports: [
    AdminHeaderComponent,
    CommonModule,

  ],
})
export class StatistiquesComponent implements OnInit {

  generalStats: any = {};
  modulesStats = new MatTableDataSource<any>([]);
  evaluationsStats = new MatTableDataSource<any>([]);
  projetsByEncadrantStats = new MatTableDataSource<any>([]);
  topProjects: { titre: string; note: number; likes: number }[] = [];

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
    this.initAllCharts();
  }



  initAllCharts(): void {
    this.adminService.getProjectsByModule2().subscribe((data: any[]) => {
      console.log(data);

      const labels = data.map(d => d.nom_module);
      const values = data.map(d => d.total);
      this.charts['projectsByModuleChart'] = this.createBarChart('projectsByModuleChart', labels, values, 'Projects per Module');
    });

     this.adminService.getSubmissionRates().subscribe((data: any[]) => {
       const labels = data.map(d => d.date);
       const values = data.map(d => d.total);
       this.charts['submissionRatesChart'] = this.createLineChart('submissionRatesChart', labels, values, 'Submissions');
    });

    this.adminService.getEvaluationDistribution().subscribe((data: any[]) => {
      const labels = data.map(d => d.note);
      const values = data.map(d => d.total);
      this.charts['evaluationDistributionChart'] = this.createBarChart('evaluationDistributionChart', labels, values, 'Evaluations');
    });

    this.adminService.getLikesVsEvaluations().subscribe((data: any[]) => {
      const labels = data.map(d => d.projet_id);
      const x = data.map(d => d.total_likes);
      const y = data.map(d => d.note);
      this.charts['likesVsEvaluationsChart'] = this.createScatterChart('likesVsEvaluationsChart', labels, x, y);
    });

    this.adminService.getEncadrantWorkload().subscribe((data: any[]) => {
      const labels = data.map(d => `${d.nom} ${d.prenom}`);
      const values = data.map(d => d.total_projects);
      this.charts['encadrantWorkloadChart'] = this.createBarChart('encadrantWorkloadChart', labels, values,'Projects per Module');
    });

    this.adminService.getModulePopularityByLikes().subscribe((data: any[]) => {
      const labels = data.map(d => d.nom);
      const values = data.map(d => d.total_likes);
      this.charts['modulePopularityChart'] = this.createStackedBarChart('modulePopularityChart', labels, values);
    });

    this.adminService.getTopRatedProjects().subscribe((data: any[]) => {
      const labels = data.map(d => d.titre);
      const values = data.map(d => d.note);
      const datas = data.map(d => d.likes);
      this.topProjects = data; 

      this.charts['topProjectsChart'] = this.createBar2Chart('topProjectsChart', labels, values, datas, 'Top Rated');
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

    createBar2Chart(id: string, labels: string[], data: number[],datas: number[], label: string): Chart {
    return new Chart(id, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: label, data: data, backgroundColor: '#42a5f5' },
          { label: label, data: datas, backgroundColor: '#ffa726' }
        ]
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



  exportChart(chartId: string) {
    const chart = this.charts[chartId];
    if (!chart) {
      console.warn(`Chart with id '${chartId}' not found.`);
      return;
    }
  
    // Création d’un lien de téléchargement de l’image du canvas
    const canvas = document.getElementById(chartId) as HTMLCanvasElement;
    if (!canvas) {
      console.warn(`Canvas element with id '${chartId}' not found.`);
      return;
    }
  
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chartId}.png`;
    a.click();
  }



  exportLeaderboard() {
    // Exemple de logique : exporter les "topProjects" en CSV
    const topProjectsData = this.charts['topProjectsChart'];
    if (!topProjectsData) {
      console.warn('Le graphique "topProjects" n’est pas disponible.');
      return;
    }
      console.log(topProjectsData);

    // Récupérer les labels et valeurs
    const labels = topProjectsData.data.labels as string[];
    const dataset = topProjectsData.data.datasets[0].data as number[];
    const datase = topProjectsData.data.datasets[1].data as number[];

    let csvContent = 'Projet,Note,Likes\n';
    labels.forEach((label, i) => {
      csvContent += `${label},${dataset[i]},${datase[i]}\n`;
    });
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'top_projects_leaderboard.csv';
    a.click();
  }
  
}