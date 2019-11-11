import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KittingAnalyzePage } from './kitting-analyze.page';

describe('KittingAnalyzePage', () => {
  let component: KittingAnalyzePage;
  let fixture: ComponentFixture<KittingAnalyzePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KittingAnalyzePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KittingAnalyzePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
