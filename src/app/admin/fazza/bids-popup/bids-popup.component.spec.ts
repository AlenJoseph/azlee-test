import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidsPopupComponent } from './bids-popup.component';

describe('BidsPopupComponent', () => {
  let component: BidsPopupComponent;
  let fixture: ComponentFixture<BidsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
