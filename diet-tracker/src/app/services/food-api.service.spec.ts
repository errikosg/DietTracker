import { TestBed } from '@angular/core/testing';

import { FoodAPIService } from './food-api.service';

describe('FoodAPIService', () => {
  let service: FoodAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
