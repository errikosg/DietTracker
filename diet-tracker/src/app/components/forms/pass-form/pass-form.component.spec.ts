import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassFormComponent } from './pass-form.component';

describe('PassFormComponent', () => {
  let component: PassFormComponent;
  let fixture: ComponentFixture<PassFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassFormComponent]
    });
    fixture = TestBed.createComponent(PassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
