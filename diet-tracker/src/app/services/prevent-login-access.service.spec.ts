import { TestBed } from '@angular/core/testing';

import { PreventLoginAccessService } from './prevent-login-access.service';

describe('PreventLoginAccessService', () => {
  let service: PreventLoginAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreventLoginAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
