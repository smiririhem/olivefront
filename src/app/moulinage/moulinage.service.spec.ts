import { TestBed } from '@angular/core/testing';

import { MoulinageService } from './moulinage.service';

describe('MoulinageService', () => {
  let service: MoulinageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoulinageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
