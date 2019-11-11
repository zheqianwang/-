import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKittingPage } from './add-kitting.page';

describe('AddKittingPage', () => {
  let component: AddKittingPage;
  let fixture: ComponentFixture<AddKittingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKittingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKittingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
