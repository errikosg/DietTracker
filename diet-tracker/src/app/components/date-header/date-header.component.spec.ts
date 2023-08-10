import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateHeaderComponent } from './date-header.component';

describe('DateHeaderComponent', () => {
  let component: DateHeaderComponent;
  let fixture: ComponentFixture<DateHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateHeaderComponent]
    });
    fixture = TestBed.createComponent(DateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
