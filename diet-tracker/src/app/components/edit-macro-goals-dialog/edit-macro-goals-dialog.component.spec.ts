import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMacroGoalsDialogComponent } from './edit-macro-goals-dialog.component';

describe('EditMacroGoalsDialogComponent', () => {
  let component: EditMacroGoalsDialogComponent;
  let fixture: ComponentFixture<EditMacroGoalsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMacroGoalsDialogComponent]
    });
    fixture = TestBed.createComponent(EditMacroGoalsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
