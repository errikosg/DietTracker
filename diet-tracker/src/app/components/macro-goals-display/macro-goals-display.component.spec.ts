import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroGoalsDisplayComponent } from './macro-goals-display.component';

describe('MacroGoalsDisplayComponent', () => {
  let component: MacroGoalsDisplayComponent;
  let fixture: ComponentFixture<MacroGoalsDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MacroGoalsDisplayComponent]
    });
    fixture = TestBed.createComponent(MacroGoalsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
