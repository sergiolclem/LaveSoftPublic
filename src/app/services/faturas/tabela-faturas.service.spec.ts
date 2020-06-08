import { TestBed } from '@angular/core/testing';

import { TabelaFaturasService } from './tabela-faturas.service';

describe('TabelaFaturasService', () => {
  let service: TabelaFaturasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabelaFaturasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
