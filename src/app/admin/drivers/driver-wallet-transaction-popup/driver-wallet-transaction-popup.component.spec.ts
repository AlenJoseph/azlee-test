import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverWalletTransactionPopupComponent } from './driver-wallet-transaction-popup.component';

describe('DriverWalletTransactionPopupComponent', () => {
  let component: DriverWalletTransactionPopupComponent;
  let fixture: ComponentFixture<DriverWalletTransactionPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverWalletTransactionPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverWalletTransactionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
