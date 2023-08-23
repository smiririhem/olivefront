import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoulinageComponent } from './moulinage.component';

describe('MoulinageComponent', () => {
  let component: MoulinageComponent;
  let fixture: ComponentFixture<MoulinageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoulinageComponent]
    });
    fixture = TestBed.createComponent(MoulinageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
