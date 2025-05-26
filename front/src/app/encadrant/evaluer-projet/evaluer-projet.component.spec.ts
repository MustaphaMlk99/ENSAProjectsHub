import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluerProjetComponent } from './evaluer-projet.component';

describe('EvaluerProjetComponent', () => {
  let component: EvaluerProjetComponent;
  let fixture: ComponentFixture<EvaluerProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluerProjetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluerProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
