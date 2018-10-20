import { TestBed, inject } from '@angular/core/testing';

import { CrudAuxilioTransporteService } from './crud-auxilio-transporte.service';

describe('CrudAuxilioTransporteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrudAuxilioTransporteService]
    });
  });

  it('should be created', inject([CrudAuxilioTransporteService], (service: CrudAuxilioTransporteService) => {
    expect(service).toBeTruthy();
  }));
});
