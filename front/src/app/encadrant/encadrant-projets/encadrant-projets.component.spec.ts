import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncadrantProjetsComponent } from './encadrant-projets.component';

describe('EncadrantProjetsComponent', () => {
  let component: EncadrantProjetsComponent;
  let fixture: ComponentFixture<EncadrantProjetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncadrantProjetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncadrantProjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
