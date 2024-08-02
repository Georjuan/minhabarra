import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarAutomaticComponent } from './bar-automatic.component';

describe('BarAutomaticComponent', () => {
  let component: BarAutomaticComponent;
  let fixture: ComponentFixture<BarAutomaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarAutomaticComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarAutomaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
