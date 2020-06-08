import { TestBed } from '@angular/core/testing';

import { PecasDaTabelaService } from './pecas-da-tabela.service';

describe('PecasDaTabelaService', () => {
  let service: PecasDaTabelaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PecasDaTabelaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
