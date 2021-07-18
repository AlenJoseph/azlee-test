import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderShopPopupComponent } from './order-shop-popup.component';

describe('OrderShopPopupComponent', () => {
  let component: OrderShopPopupComponent;
  let fixture: ComponentFixture<OrderShopPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderShopPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderShopPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
