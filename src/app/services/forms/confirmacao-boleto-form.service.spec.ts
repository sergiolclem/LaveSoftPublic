import { TestBed } from '@angular/core/testing';

import { ConfirmacaoBoletoFormService } from './confirmacao-boleto-form.service';

describe('ConfirmacaoBoletoFormService', () => {
  let service: ConfirmacaoBoletoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmacaoBoletoFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
