import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogHistoryItemComponent } from './log-history-item.component';

describe('LogHistoryItemComponent', () => {
  let component: LogHistoryItemComponent;
  let fixture: ComponentFixture<LogHistoryItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogHistoryItemComponent]
    });
    fixture = TestBed.createComponent(LogHistoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
