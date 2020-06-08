import { TestBed } from '@angular/core/testing';

import { PecasService } from './pecas.service';

describe('PecasService', () => {
  let service: PecasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PecasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
