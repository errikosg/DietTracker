import { TestBed } from '@angular/core/testing';

import { MacroGoalResolverService } from './macro-goal-resolver.service';

describe('MacroGoalResolverService', () => {
  let service: MacroGoalResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MacroGoalResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
