import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDriverPopupComponent } from './order-driver-popup.component';

describe('OrderDriverPopupComponent', () => {
  let component: OrderDriverPopupComponent;
  let fixture: ComponentFixture<OrderDriverPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDriverPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDriverPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
