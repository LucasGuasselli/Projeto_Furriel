import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaExclusaoAuxiliosTransporteComponent } from './tabela-exclusao-auxilios-transporte.component';

describe('TabelaExclusaoAuxiliosTransporteComponent', () => {
  let component: TabelaExclusaoAuxiliosTransporteComponent;
  let fixture: ComponentFixture<TabelaExclusaoAuxiliosTransporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaExclusaoAuxiliosTransporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaExclusaoAuxiliosTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
