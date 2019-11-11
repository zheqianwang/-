import { TestBed } from '@angular/core/testing';

import { ProcessReportService } from './process-report.service';

describe('ProcessReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessReportService = TestBed.get(ProcessReportService);
    expect(service).toBeTruthy();
  });
});
