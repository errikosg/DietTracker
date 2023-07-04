import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIngredientFormComponent } from './add-ingredient-form.component';

describe('AddIngredientFormComponent', () => {
  let component: AddIngredientFormComponent;
  let fixture: ComponentFixture<AddIngredientFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddIngredientFormComponent]
    });
    fixture = TestBed.createComponent(AddIngredientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
