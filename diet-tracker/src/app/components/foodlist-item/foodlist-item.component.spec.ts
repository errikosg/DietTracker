import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodInfoComponent } from './foodlist-item.component';

describe('FoodInfoComponent', () => {
  let component: FoodInfoComponent;
  let fixture: ComponentFixture<FoodInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodInfoComponent]
    });
    fixture = TestBed.createComponent(FoodInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
