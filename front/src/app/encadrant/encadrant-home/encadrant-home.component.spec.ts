import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncadrantHomeComponent } from './encadrant-home.component';

describe('EncadrantHomeComponent', () => {
  let component: EncadrantHomeComponent;
  let fixture: ComponentFixture<EncadrantHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncadrantHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncadrantHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
