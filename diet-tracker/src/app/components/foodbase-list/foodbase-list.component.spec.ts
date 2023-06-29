import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodBaseListComponent } from './foodbase-list.component';

describe('FoodBaseListComponent', () => {
  let component: FoodBaseListComponent;
  let fixture: ComponentFixture<FoodBaseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodBaseListComponent]
    });
    fixture = TestBed.createComponent(FoodBaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
