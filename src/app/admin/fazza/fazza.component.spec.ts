import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FazzaComponent } from './fazza.component';

describe('FazzaComponent', () => {
  let component: FazzaComponent;
  let fixture: ComponentFixture<FazzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FazzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FazzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
