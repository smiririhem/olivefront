import { TestBed } from '@angular/core/testing';

import { MoulinService } from './moulin.service';

describe('MoulinService', () => {
  let service: MoulinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoulinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
