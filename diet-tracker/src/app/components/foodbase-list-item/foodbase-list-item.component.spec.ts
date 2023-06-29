import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodBaseListItemComponent } from './foodbase-list-item.component';

describe('FoodBaseListItemComponent', () => {
  let component: FoodBaseListItemComponent;
  let fixture: ComponentFixture<FoodBaseListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodBaseListItemComponent]
    });
    fixture = TestBed.createComponent(FoodBaseListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
