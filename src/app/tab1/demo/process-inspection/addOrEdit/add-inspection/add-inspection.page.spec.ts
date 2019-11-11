import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInspectionPage } from './add-inspection.page';

describe('AddInspectionPage', () => {
  let component: AddInspectionPage;
  let fixture: ComponentFixture<AddInspectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInspectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInspectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
