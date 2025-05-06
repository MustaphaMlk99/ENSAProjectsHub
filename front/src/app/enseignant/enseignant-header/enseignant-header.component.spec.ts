import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantHeaderComponent } from './enseignant-header.component';

describe('EnseignantHeaderComponent', () => {
  let component: EnseignantHeaderComponent;
  let fixture: ComponentFixture<EnseignantHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnseignantHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnseignantHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
