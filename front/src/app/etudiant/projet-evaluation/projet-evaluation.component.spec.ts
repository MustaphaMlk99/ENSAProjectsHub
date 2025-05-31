import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetEvaluationComponent } from './projet-evaluation.component';

describe('ProjetEvaluationComponent', () => {
  let component: ProjetEvaluationComponent;
  let fixture: ComponentFixture<ProjetEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetEvaluationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
