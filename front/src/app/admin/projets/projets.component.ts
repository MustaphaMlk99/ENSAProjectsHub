import { Component } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Needed for [(ngModel)]

@Component({
  selector: 'app-projets',
  standalone: true,
  imports: [
    AdminHeaderComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './projets.component.html',
  styleUrl: './projets.component.scss'
})
export class ProjetsComponent {
  projets: any[] = [];
  userId: number = 1;
  years = [1, 2, 3];
  selectedSort = 'desc';
  selectedYear: number | null = null;
  modules: any[] = [];
  selectedModule: string | null = null;

  showLikesDropdown = false;
  showYearDropdown = false;
  showModuleDropdown = false;

  constructor(
    private router: Router,
    private adminService: AdminService
  ) {
    const storedId = localStorage.getItem('id_user');
    this.userId = storedId ? parseInt(storedId, 10) : 0;
    console.log('ID utilisateur connecté :', this.userId);
  }

  ngOnInit() {
    this.fetchProjets();
    this.fetchModules();
    this.fetchProjectsByLikes('desc');
  }

fetchProjets() {
  const direction = this.selectedSort === 'asc' ? 'asc' : 'desc';

  // Filtrer par module si sélectionné
  if (this.selectedModule) {
    this.adminService.getProjectsByModule(+this.selectedModule).subscribe((data: any[]) => {
      this.projets = data;

      // Ajout des likes si nécessaire
      this.projets.forEach(projet => {
        if (projet.likesCount === undefined) {
          this.adminService.getLikesCount(projet.id).subscribe((res) => {
            projet.likesCount = res.likes;
          });
        }
      });
    }, error => {
      console.error('Erreur lors du filtrage par module :', error);
    });

  // Sinon filtrer par année
  } else if (this.selectedYear) {
    this.adminService.getProjectsByYear(+this.selectedYear).subscribe((data: any[]) => {
      this.projets = data;

      this.projets.forEach(projet => {
        if (projet.likesCount === undefined) {
          this.adminService.getLikesCount(projet.id).subscribe((res) => {
            projet.likesCount = res.likes;
          });
        }
      });
    }, error => {
      console.error('Erreur lors du filtrage par année :', error);
    });

  // Sinon trier par likes
  } else {
    this.adminService.getProjectsSortedByLikes(direction).subscribe((data: any[]) => {
      this.projets = data;

      this.projets.forEach(projet => {
        if (projet.likesCount === undefined) {
          this.adminService.getLikesCount(projet.id).subscribe((res) => {
            projet.likesCount = res.likes;
          });
        }
      });
    }, error => {
      console.error('Erreur lors du tri des projets par likes :', error);
    });
  }
}





  onSortChange() {
    this.fetchProjets(); // refresh with new sort
  }

  fetchProjectsByLikes(direction: 'asc' | 'desc') {
  this.adminService.getProjectsSortedByLikes(direction).subscribe((data: any[]) => {
    this.projets = data;

    // Optional: Fetch like counts if not already included in backend response
    this.projets.forEach(projet => {
      this.adminService.getLikesCount(projet.id).subscribe((response) => {
        projet.likesCount = response.likes;
      });
    });
  }, error => {
    console.error('Erreur lors du chargement des projets triés:', error);
  });
}
onModify(project: any) {
  // logic for modification (open modal, navigate, etc.)
  console.log('Modify:', project);
}

onDelete(project: any) {
  // logic for deletion (confirm dialog, then call API)
  console.log('Delete:', project);
}

onYearChange() {
  this.fetchProjets();
}

toggleLikesDropdown() {
  this.showLikesDropdown = !this.showLikesDropdown;
  this.showYearDropdown = false; // close other dropdown
    this.showModuleDropdown = false; // close other dropdown
}

toggleYearDropdown() {
  this.showYearDropdown = !this.showYearDropdown;
  this.showLikesDropdown = false; // close other dropdown
  this.showModuleDropdown = false;
}

toggleModuleDropdown() {
  this.showModuleDropdown = !this.showModuleDropdown;
  this.showLikesDropdown = false;
  this.showYearDropdown = false;
}

selectSort(sort: string) {
  this.selectedSort = sort;
  this.showLikesDropdown = false;
  this.fetchProjets();  // refresh projects with new sort
}

selectYear(year: number | null) {
  this.selectedYear = year;
  this.showYearDropdown = false;
  this.fetchProjets();  // refresh projects with new year filter
}



selectModule(module: string | null) {
  this.selectedModule = module;
  this.showModuleDropdown = false;
  this.fetchProjets();
}


fetchModules() {
  this.adminService.getModules().subscribe(data => {
    this.modules = data;
  });
}


}
