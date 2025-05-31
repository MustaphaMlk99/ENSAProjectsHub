import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EncadrantService } from '../encadrant.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-evaluer-projet',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './evaluer-projet.component.html',
  styleUrl: './evaluer-projet.component.scss'
})
export class EvaluerProjetComponent implements OnInit {

  projetId!: number;
  projetData: any;
  userId: number | undefined;

  constructor(private route: ActivatedRoute,  private encadrantService: EncadrantService, private router: Router,) { }

  ngOnInit(): void {
    const storedId = localStorage.getItem('id_user');
    this.userId = storedId ? parseInt(storedId, 10) : 0;
    this.projetId = Number(this.route.snapshot.paramMap.get('id'));
    this.encadrantService.getProjetById(this.projetId).subscribe((data: any[]) => {
      this.projetData = data;
      this.projetData.projetEvalue =  this.projetData?.livrable?.evaluation?.note ?? false;
      console.log("this.projetData ",this.projetData);
    });
  }

  saveEvaluation() {
  const payload = {
    livrable_id: this.projetData.livrable.id,
    note: this.projetData.note,
    commentaire: this.projetData.remarque
  };

  console.log("hit", this.projetData);
  this.encadrantService.saveEvaluation(payload).subscribe({
    next: () => {
      this.router.navigate(['/encadrant_home']);
    },
    error: (err) => {
      console.error('Erreur lors de la mise à jour de la note :', err);
    }
  });
}

}
