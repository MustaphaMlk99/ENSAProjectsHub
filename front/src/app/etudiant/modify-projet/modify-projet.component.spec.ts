import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyProjetComponent } from './modify-projet.component';

describe('ModifyProjetComponent', () => {
  let component: ModifyProjetComponent;
  let fixture: ComponentFixture<ModifyProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyProjetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
