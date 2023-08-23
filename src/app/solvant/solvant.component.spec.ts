import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolvantComponent } from './solvant.component';

describe('SolvantComponent', () => {
  let component: SolvantComponent;
  let fixture: ComponentFixture<SolvantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolvantComponent]
    });
    fixture = TestBed.createComponent(SolvantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
