import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopWalletTransactionPopupComponent } from './shop-wallet-transaction-popup.component';

describe('ShopWalletTransactionPopupComponent', () => {
  let component: ShopWalletTransactionPopupComponent;
  let fixture: ComponentFixture<ShopWalletTransactionPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopWalletTransactionPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopWalletTransactionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
