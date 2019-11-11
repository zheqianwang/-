import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadjsPage } from './spreadjs.page';

describe('SpreadjsPage', () => {
  let component: SpreadjsPage;
  let fixture: ComponentFixture<SpreadjsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpreadjsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpreadjsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
