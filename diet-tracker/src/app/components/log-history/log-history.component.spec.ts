import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogHistoryComponent } from './log-history.component';

describe('LogHistoryComponent', () => {
  let component: LogHistoryComponent;
  let fixture: ComponentFixture<LogHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogHistoryComponent]
    });
    fixture = TestBed.createComponent(LogHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
