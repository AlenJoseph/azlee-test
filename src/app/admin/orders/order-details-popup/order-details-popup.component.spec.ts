import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsPopupComponent } from './order-details-popup.component';

describe('OrderDetailsPopupComponent', () => {
  let component: OrderDetailsPopupComponent;
  let fixture: ComponentFixture<OrderDetailsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
