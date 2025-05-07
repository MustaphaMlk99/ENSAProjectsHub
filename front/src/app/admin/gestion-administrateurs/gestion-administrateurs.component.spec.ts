import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAdministrateursComponent } from './gestion-administrateurs.component';

describe('GestionAdministrateursComponent', () => {
  let component: GestionAdministrateursComponent;
  let fixture: ComponentFixture<GestionAdministrateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionAdministrateursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionAdministrateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
