import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEncadrantsComponent } from './gestion-encadrants.component';

describe('GestionEncadrantsComponent', () => {
  let component: GestionEncadrantsComponent;
  let fixture: ComponentFixture<GestionEncadrantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionEncadrantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionEncadrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
