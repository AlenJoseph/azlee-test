import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCustomerPopupComponent } from './order-customer-popup.component';

describe('OrderCustomerPopupComponent', () => {
  let component: OrderCustomerPopupComponent;
  let fixture: ComponentFixture<OrderCustomerPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCustomerPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCustomerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
