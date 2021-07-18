import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDetailPopupComponent } from './shop-detail-popup.component';

describe('ShopDetailPopupComponent', () => {
  let component: ShopDetailPopupComponent;
  let fixture: ComponentFixture<ShopDetailPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopDetailPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
