import { TestBed } from '@angular/core/testing';

import { LotoliveService } from './lotolive.service';

describe('LotoliveService', () => {
  let service: LotoliveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotoliveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
