import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductionProgressPage } from './add-production-progress.page';

describe('AddProductionProgressPage', () => {
  let component: AddProductionProgressPage;
  let fixture: ComponentFixture<AddProductionProgressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductionProgressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductionProgressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
