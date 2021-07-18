import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverWalletPopupComponent } from './driver-wallet-popup.component';

describe('DriverWalletPopupComponent', () => {
  let component: DriverWalletPopupComponent;
  let fixture: ComponentFixture<DriverWalletPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverWalletPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverWalletPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
