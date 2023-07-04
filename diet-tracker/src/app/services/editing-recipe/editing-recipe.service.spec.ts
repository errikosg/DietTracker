import { TestBed } from '@angular/core/testing';

import { EditingRecipeService } from './editing-recipe.service';

describe('EditingRecipeService', () => {
  let service: EditingRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditingRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
