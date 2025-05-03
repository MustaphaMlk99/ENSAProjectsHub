import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantHeaderComponent } from './etudiant-header.component';

describe('EtudiantHeaderComponent', () => {
  let component: EtudiantHeaderComponent;
  let fixture: ComponentFixture<EtudiantHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudiantHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
