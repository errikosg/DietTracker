import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailFormDialogComponent } from './email-form-dialog.component';

describe('EmailFormDialogComponent', () => {
  let component: EmailFormDialogComponent;
  let fixture: ComponentFixture<EmailFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailFormDialogComponent]
    });
    fixture = TestBed.createComponent(EmailFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
