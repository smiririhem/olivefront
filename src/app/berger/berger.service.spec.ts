import { TestBed } from '@angular/core/testing';

import { BergerService } from './berger.service';

describe('BergerService', () => {
  let service: BergerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BergerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
