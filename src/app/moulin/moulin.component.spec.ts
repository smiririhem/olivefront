import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoulinComponent } from './moulin.component';

describe('MoulinComponent', () => {
  let component: MoulinComponent;
  let fixture: ComponentFixture<MoulinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoulinComponent]
    });
    fixture = TestBed.createComponent(MoulinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
