import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionProgressPage } from './production-progress.page';

describe('ProductionProgressPage', () => {
  let component: ProductionProgressPage;
  let fixture: ComponentFixture<ProductionProgressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionProgressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionProgressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
