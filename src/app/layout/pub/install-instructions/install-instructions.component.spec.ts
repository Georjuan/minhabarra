import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallInstructionsComponent } from './install-instructions.component';

describe('InstallInstructionsComponent', () => {
  let component: InstallInstructionsComponent;
  let fixture: ComponentFixture<InstallInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstallInstructionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstallInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
