import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessInspectionPage } from './process-inspection.page';

describe('ProcessInspectionPage', () => {
  let component: ProcessInspectionPage;
  let fixture: ComponentFixture<ProcessInspectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessInspectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessInspectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
