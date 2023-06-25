import { TestBed } from '@angular/core/testing';

import { MacroGoalService } from './macro-goal.service';

describe('MacroGoalService', () => {
  let service: MacroGoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MacroGoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
