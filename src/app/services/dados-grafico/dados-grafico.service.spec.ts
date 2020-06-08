import { TestBed } from '@angular/core/testing';

import { DadosGraficoService } from './dados-grafico.service';

describe('DadosGraficoService', () => {
  let service: DadosGraficoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadosGraficoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
