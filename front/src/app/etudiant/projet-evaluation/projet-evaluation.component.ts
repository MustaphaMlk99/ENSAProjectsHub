import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EtudiantService } from '../etudiant.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projet-evaluation',
  standalone: true, // si tu utilises les composants standalone
  templateUrl: './projet-evaluation.component.html',
  styleUrls: ['./projet-evaluation.component.scss'],
  imports: [CommonModule] // ✅ ajoute ceci
})
export class ProjetEvaluationComponent implements OnInit {
  evaluation: any;
  projet: any;
  certificat: any;

  constructor(
    private route: ActivatedRoute,
    private etudiantService: EtudiantService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.etudiantService.getProjetById(id).subscribe({
      next: (projet) => {
        this.projet = projet;
        this.evaluation = projet.livrable.evaluation;
        this.certificat = projet?.certificat;
        console.log("projet ", projet);
      },
      error: (err) => console.error('Erreur chargement projet:', err)
    });
  }
}
