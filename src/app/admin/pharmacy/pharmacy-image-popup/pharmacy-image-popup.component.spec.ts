import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyImagePopupComponent } from './pharmacy-image-popup.component';

describe('PharmacyImagePopupComponent', () => {
  let component: PharmacyImagePopupComponent;
  let fixture: ComponentFixture<PharmacyImagePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyImagePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyImagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
