import { TestBed, inject } from '@angular/core/testing';

import { CrudPagamentoAtrasadoService } from './crud-pagamento-atrasado.service';

describe('CrudPagamentoAtrasadoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrudPagamentoAtrasadoService]
    });
  });

  it('should be created', inject([CrudPagamentoAtrasadoService], (service: CrudPagamentoAtrasadoService) => {
    expect(service).toBeTruthy();
  }));
});
