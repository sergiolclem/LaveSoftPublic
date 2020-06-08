import { TestBed } from '@angular/core/testing';

import { TabelasDePrecoService } from './tabelas-de-preco.service';

describe('TabelasDePrecoService', () => {
  let service: TabelasDePrecoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabelasDePrecoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
