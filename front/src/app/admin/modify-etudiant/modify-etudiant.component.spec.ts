import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyEtudiantComponent } from './modify-etudiant.component';

describe('ModifyEtudiantComponent', () => {
  let component: ModifyEtudiantComponent;
  let fixture: ComponentFixture<ModifyEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyEtudiantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
