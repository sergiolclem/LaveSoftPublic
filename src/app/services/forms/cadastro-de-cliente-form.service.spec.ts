import { TestBed } from '@angular/core/testing';

import { CadastroDeClienteFormService } from './cadastro-de-cliente-form.service';

describe('CadastroDeClienteFormService', () => {
  let service: CadastroDeClienteFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroDeClienteFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
