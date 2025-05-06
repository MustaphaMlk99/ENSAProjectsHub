import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetEnAttenteComponent } from './projet-en-attente.component';

describe('ProjetEnAttenteComponent', () => {
  let component: ProjetEnAttenteComponent;
  let fixture: ComponentFixture<ProjetEnAttenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetEnAttenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetEnAttenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
