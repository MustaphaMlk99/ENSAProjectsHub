import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncadrantHeaderComponent } from './encadrant-header.component';

describe('EncadrantHeaderComponent', () => {
  let component: EncadrantHeaderComponent;
  let fixture: ComponentFixture<EncadrantHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncadrantHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncadrantHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
