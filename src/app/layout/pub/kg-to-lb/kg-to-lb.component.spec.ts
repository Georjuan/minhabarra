import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KgToLbComponent } from './kg-to-lb.component';

describe('KgToLbComponent', () => {
  let component: KgToLbComponent;
  let fixture: ComponentFixture<KgToLbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KgToLbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KgToLbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
