import { TestBed, inject } from '@angular/core/testing';

import { CrudAditamentosService } from './crud-aditamentos.service';

describe('CrudAditamentosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrudAditamentosService]
    });
  });

  it('should be created', inject([CrudAditamentosService], (service: CrudAditamentosService) => {
    expect(service).toBeTruthy();
  }));
});
