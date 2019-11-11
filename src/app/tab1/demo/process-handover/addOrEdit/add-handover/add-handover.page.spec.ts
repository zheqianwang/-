import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHandoverPage } from './add-handover.page';

describe('AddHandoverPage', () => {
  let component: AddHandoverPage;
  let fixture: ComponentFixture<AddHandoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHandoverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHandoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
