import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetConsultationComponent } from './projet-consultation.component';

describe('ProjetConsultationComponent', () => {
  let component: ProjetConsultationComponent;
  let fixture: ComponentFixture<ProjetConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
