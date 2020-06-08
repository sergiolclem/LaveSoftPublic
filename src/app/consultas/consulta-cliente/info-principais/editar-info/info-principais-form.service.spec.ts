import { TestBed } from '@angular/core/testing';

import { InfoPrincipaisFormService } from './info-principais-form.service';

describe('InfoPrincipaisFormService', () => {
  let service: InfoPrincipaisFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoPrincipaisFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
