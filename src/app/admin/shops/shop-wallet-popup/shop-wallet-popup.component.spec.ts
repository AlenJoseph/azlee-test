import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopWalletPopupComponent } from './shop-wallet-popup.component';

describe('ShopWalletPopupComponent', () => {
  let component: ShopWalletPopupComponent;
  let fixture: ComponentFixture<ShopWalletPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopWalletPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopWalletPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
