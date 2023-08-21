import { TestBed } from '@angular/core/testing';

import { AllConsumptionsResolverService } from './all-consumptions-resolver.service';

describe('AllConsumptionsResolverService', () => {
  let service: AllConsumptionsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllConsumptionsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
