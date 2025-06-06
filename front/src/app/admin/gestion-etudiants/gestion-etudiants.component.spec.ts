import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEtudiantsComponent } from './gestion-etudiants.component';

describe('GestionEtudiantsComponent', () => {
  let component: GestionEtudiantsComponent;
  let fixture: ComponentFixture<GestionEtudiantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionEtudiantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
