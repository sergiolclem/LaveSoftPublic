import { TestBed } from '@angular/core/testing';

import { GeradorDeBoletoService } from './gerador-de-boleto.service';

describe('GeradorDeBoletoService', () => {
  let service: GeradorDeBoletoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeradorDeBoletoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
