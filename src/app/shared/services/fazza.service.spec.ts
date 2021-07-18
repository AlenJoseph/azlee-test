import { TestBed } from '@angular/core/testing';

import { FazzaService } from './fazza.service';

describe('FazzaService', () => {
  let service: FazzaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FazzaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
