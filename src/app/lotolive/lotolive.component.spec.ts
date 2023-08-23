import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotoliveComponent } from './lotolive.component';

describe('LotoliveComponent', () => {
  let component: LotoliveComponent;
  let fixture: ComponentFixture<LotoliveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LotoliveComponent]
    });
    fixture = TestBed.createComponent(LotoliveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
