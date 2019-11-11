import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditPage } from './add-or-edit.page';

describe('AddOrEditPage', () => {
  let component: AddOrEditPage;
  let fixture: ComponentFixture<AddOrEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
