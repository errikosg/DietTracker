import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPasswordComponent } from './custom-password.component';

describe('CustomPasswordComponent', () => {
  let component: CustomPasswordComponent;
  let fixture: ComponentFixture<CustomPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomPasswordComponent]
    });
    fixture = TestBed.createComponent(CustomPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
