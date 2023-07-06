import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentBarComponent } from './percent-bar.component';

describe('PercentBarComponent', () => {
  let component: PercentBarComponent;
  let fixture: ComponentFixture<PercentBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PercentBarComponent]
    });
    fixture = TestBed.createComponent(PercentBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
