import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyEncadrantComponent } from './modify-encadrant.component';

describe('ModifyEncadrantComponent', () => {
  let component: ModifyEncadrantComponent;
  let fixture: ComponentFixture<ModifyEncadrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyEncadrantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyEncadrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
