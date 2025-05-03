import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EtudiantHeaderComponent } from '../etudiant-header/etudiant-header.component';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.scss',
  imports: [    
  EtudiantHeaderComponent,
  CommonModule, 
  MatCardModule, 
  MatButtonModule]
})
export class HistoriqueComponent {
  projects = [
    { id: 1, title: 'Système de gestion ENSA', description: 'Application pour la gestion des étudiants et enseignants.' },
    { id: 2, title: 'Site Web ENSA Kénitra', description: 'Site vitrine dynamique pour présenter l’école et ses services.' },
    { id: 3, title: 'Application mobile clubs', description: 'Application mobile pour gérer les clubs et événements.' },
    { id: 4, title: 'Portail de stages', description: 'Plateforme pour la recherche et le suivi des stages étudiants.' },
    { id: 5, title: 'Gestion des emplois du temps', description: 'Outil de planification automatique des cours et examens.' },
    { id: 6, title: 'E-learning ENSA', description: 'Système de gestion de cours en ligne avec vidéos et quiz.' },
    { id: 7, title: 'Gestion des laboratoires', description: 'Application pour réserver et suivre l’utilisation des labos.' },
    { id: 8, title: 'Forum étudiants', description: 'Espace de discussion entre étudiants et enseignants.' },
    { id: 9, title: 'Bibliothèque numérique', description: 'Accès en ligne aux ressources pédagogiques et livres ENSA.' },
    { id: 10, title: 'Application BDE ENSA', description: 'Gestion des activités du Bureau des Étudiants.' },
    { id: 11, title: 'Suivi des absences', description: 'Application de pointage et de suivi des présences.' },
    { id: 12, title: 'Plateforme des projets fin d’études', description: 'Publication, suivi et évaluation des PFE.' },
    { id: 13, title: 'Application pour les clubs ENSA', description: 'Gestion des membres, événements et budgets.' },
    { id: 14, title: 'Agenda académique', description: 'Affichage des dates importantes de l’année universitaire.' },
    { id: 15, title: 'Application météo ENSA', description: 'Infos météo locales avec interface simple et animée.' },
    { id: 16, title: 'Bot assistant étudiant', description: 'Chatbot pour répondre aux questions fréquentes.' },
    { id: 17, title: 'Gestion des inscriptions', description: 'Module complet d’inscription en ligne.' },
    { id: 18, title: 'Système de vote électronique', description: 'Élections du BDE et des délégués en ligne.' },
  ];

  editProject(id: number) {
    console.log('Modifier projet ID:', id);
    // ici vous pouvez ajouter la navigation ou logique de modification
  }

  deleteProject(id: number) {
    this.projects = this.projects.filter(p => p.id !== id);
  }
}
