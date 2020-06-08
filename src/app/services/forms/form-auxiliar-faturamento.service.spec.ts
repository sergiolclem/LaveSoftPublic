import { TestBed } from '@angular/core/testing';

import { FormAuxiliarFaturamentoService } from './form-auxiliar-faturamento.service';

describe('FormAuxiliarFaturamentoService', () => {
  let service: FormAuxiliarFaturamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormAuxiliarFaturamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
