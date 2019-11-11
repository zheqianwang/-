import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessStartsPage } from './process-starts.page';

describe('ProcessStartsPage', () => {
  let component: ProcessStartsPage;
  let fixture: ComponentFixture<ProcessStartsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessStartsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessStartsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
