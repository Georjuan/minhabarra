import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcPercentComponent } from './calc-percent.component';

describe('CalcPercentComponent', () => {
  let component: CalcPercentComponent;
  let fixture: ComponentFixture<CalcPercentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalcPercentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalcPercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
