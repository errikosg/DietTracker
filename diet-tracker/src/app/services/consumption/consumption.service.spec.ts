import { TestBed } from '@angular/core/testing';

import { ConsumptionService } from './consumption.service';

describe('ConsumptionService', () => {
  let service: ConsumptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
