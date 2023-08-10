import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutChartComponent } from './donut-chart.component';

describe('DonutChartComponent', () => {
  let component: DonutChartComponent;
  let fixture: ComponentFixture<DonutChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonutChartComponent]
    });
    fixture = TestBed.createComponent(DonutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
