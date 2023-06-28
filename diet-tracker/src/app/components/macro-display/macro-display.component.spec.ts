import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroDisplayComponent } from './macro-display.component';

describe('MacroDisplayComponent', () => {
  let component: MacroDisplayComponent;
  let fixture: ComponentFixture<MacroDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MacroDisplayComponent]
    });
    fixture = TestBed.createComponent(MacroDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
