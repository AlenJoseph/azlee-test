import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FazzaPartnerComponent } from './fazza-partner.component';

describe('FazzaPartnerComponent', () => {
  let component: FazzaPartnerComponent;
  let fixture: ComponentFixture<FazzaPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FazzaPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FazzaPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
