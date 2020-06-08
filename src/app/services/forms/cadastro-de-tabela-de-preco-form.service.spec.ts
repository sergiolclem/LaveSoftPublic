import { TestBed } from '@angular/core/testing';

import { CadastroDeTabelaDePrecoFormService } from './cadastro-de-tabela-de-preco-form.service';

describe('CadastroDeTabelaDePrecoFormService', () => {
  let service: CadastroDeTabelaDePrecoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroDeTabelaDePrecoFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
