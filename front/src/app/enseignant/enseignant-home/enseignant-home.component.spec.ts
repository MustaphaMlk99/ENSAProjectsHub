import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantHomeComponent } from './enseignant-home.component';

describe('EnseignantHomeComponent', () => {
  let component: EnseignantHomeComponent;
  let fixture: ComponentFixture<EnseignantHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnseignantHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnseignantHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
