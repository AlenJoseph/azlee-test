import { TestBed } from '@angular/core/testing';

import { GeneralAuthGuard } from './general-auth.guard';

describe('AuthGuard', () => {
  let guard: GeneralAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GeneralAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
