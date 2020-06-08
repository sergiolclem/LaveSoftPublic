import { TestBed } from '@angular/core/testing';

import { GeradorPdfService } from './gerador-pdf.service';

describe('GeradorPdfService', () => {
  let service: GeradorPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeradorPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
