import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessReportPage } from './processReport.page';

describe('Demo2Page', () => {
  let component: ProcessReportPage;
  let fixture: ComponentFixture<ProcessReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
