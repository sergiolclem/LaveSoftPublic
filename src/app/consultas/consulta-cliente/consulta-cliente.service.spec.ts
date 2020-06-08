import { TestBed } from '@angular/core/testing';

import { ConsultaClienteService } from './consulta-cliente.service';

describe('ConsultaClienteService', () => {
  let service: ConsultaClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
