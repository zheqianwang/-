import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSecondaryInspectionPage } from './add-secondary-inspection.page';

describe('AddSecondaryInspectionPage', () => {
  let component: AddSecondaryInspectionPage;
  let fixture: ComponentFixture<AddSecondaryInspectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSecondaryInspectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSecondaryInspectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
