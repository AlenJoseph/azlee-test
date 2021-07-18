import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverLocationPopupComponent } from './driver-location-popup.component';

describe('DriverLocationPopupComponent', () => {
  let component: DriverLocationPopupComponent;
  let fixture: ComponentFixture<DriverLocationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverLocationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverLocationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
