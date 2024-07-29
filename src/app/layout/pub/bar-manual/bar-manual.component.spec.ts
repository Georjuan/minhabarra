import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarManualComponent } from './bar-manual.component';

describe('BarManualComponent', () => {
  let component: BarManualComponent;
  let fixture: ComponentFixture<BarManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarManualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
