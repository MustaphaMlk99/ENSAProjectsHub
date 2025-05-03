import { Component } from '@angular/core';
import { EtudiantHeaderComponent } from '../etudiant-header/etudiant-header.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-etudiant-home',
  templateUrl: './etudiant-home.component.html',
  styleUrl: './etudiant-home.component.scss',
  imports: [
    EtudiantHeaderComponent,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})

export class EtudiantHomeComponent {
  currentSlide = 0;

  slides = [
    {
      title: 'Formations ENSA Kénitra',
      description: 'Découvrez les filières ingénieurs proposées à l\'ENSA Kénitra.',
      image: 'https://ensa.uit.ac.ma/wp-content/uploads/2024/12/IMG_8027-1.png',
      link: 'https://ensa.uit.ac.ma/?page_id=4399'
    },
    {
      title: 'Espaces d\'Apprentissage',
      description: 'Découvrez les espaces d\'apprentissage  de l\'ENSA Kénitra.',
      image: 'https://www.uit.ac.ma/wp-content/uploads/2023/06/amphi-534x400.webp',
      link: 'https://ensa.uit.ac.ma/?page_id=4670'
    },
    {
      title: 'Vie étudiante',
      description: 'Activités, clubs et événements étudiants à l\'ENSA Kénitra.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHggoZwNW1-GebvwWdjfY0GbkA39w-8fUUZQ&s',
      link: 'https://ensa.uit.ac.ma/?page_id=4920'
    }
  ];
  

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }
}


