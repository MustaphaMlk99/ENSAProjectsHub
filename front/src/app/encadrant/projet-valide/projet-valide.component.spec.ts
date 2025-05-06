import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetValideComponent } from './projet-valide.component';

describe('ProjetValideComponent', () => {
  let component: ProjetValideComponent;
  let fixture: ComponentFixture<ProjetValideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetValideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetValideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
