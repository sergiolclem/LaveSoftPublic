import { TestBed } from '@angular/core/testing';

import { ConsultaRegistroService } from './consulta-registro.service';

describe('ConsultaRegistroService', () => {
  let service: ConsultaRegistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaRegistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
