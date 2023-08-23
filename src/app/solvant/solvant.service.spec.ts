import { TestBed } from '@angular/core/testing';

import { SolvantService } from './solvant.service';

describe('SolvantService', () => {
  let service: SolvantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolvantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
