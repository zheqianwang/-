import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryInspectionPage } from './secondary-inspection.page';

describe('SecondaryInspectionPage', () => {
  let component: SecondaryInspectionPage;
  let fixture: ComponentFixture<SecondaryInspectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryInspectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryInspectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
