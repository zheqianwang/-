import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileReferencePage } from './fileReference.page';

describe('Demo1Page', () => {
  let component: FileReferencePage;
  let fixture: ComponentFixture<FileReferencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileReferencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileReferencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
