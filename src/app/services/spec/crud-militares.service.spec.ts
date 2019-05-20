import { TestBed, inject } from '@angular/core/testing';

import { MilitaresService } from './../militares.service';

describe('CrudMilitaresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MilitaresService]
    });
  });

  it('should be created', inject([MilitaresService], (service: MilitaresService) => {
    expect(service).toBeTruthy();
  }));
});
