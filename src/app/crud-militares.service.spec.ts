import { TestBed, inject } from '@angular/core/testing';

import { CrudMilitaresService } from './crud-militares.service';

describe('CrudMilitaresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrudMilitaresService]
    });
  });

  it('should be created', inject([CrudMilitaresService], (service: CrudMilitaresService) => {
    expect(service).toBeTruthy();
  }));
});
