import { TestBed } from '@angular/core/testing';

import { ConsumptionsResolverService } from './consumptions-resolver.service';

describe('ConsumptionsResolverService', () => {
  let service: ConsumptionsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumptionsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
