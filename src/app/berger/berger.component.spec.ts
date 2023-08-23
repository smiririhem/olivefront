import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BergerComponent } from './berger.component';

describe('BergerComponent', () => {
  let component: BergerComponent;
  let fixture: ComponentFixture<BergerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BergerComponent]
    });
    fixture = TestBed.createComponent(BergerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
