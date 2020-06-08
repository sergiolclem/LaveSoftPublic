import { TestBed } from '@angular/core/testing';

import { DadosTabelaService } from './dados-tabela.service';

describe('DadosTabelaService', () => {
  let service: DadosTabelaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadosTabelaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
