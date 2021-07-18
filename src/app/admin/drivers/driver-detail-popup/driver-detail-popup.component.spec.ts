import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverDetailPopupComponent } from './driver-detail-popup.component';

describe('DriverDetailPopupComponent', () => {
  let component: DriverDetailPopupComponent;
  let fixture: ComponentFixture<DriverDetailPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverDetailPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
