import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilEncadrantComponent } from './profil-encadrant.component';

describe('ProfilEncadrantComponent', () => {
  let component: ProfilEncadrantComponent;
  let fixture: ComponentFixture<ProfilEncadrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilEncadrantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilEncadrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
