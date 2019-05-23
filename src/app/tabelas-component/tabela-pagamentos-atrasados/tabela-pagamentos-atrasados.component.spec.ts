import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaPagamentosAtrasadosComponent } from './tabela-pagamentos-atrasados.component';

describe('TabelaPagamentosAtrasadosComponent', () => {
  let component: TabelaPagamentosAtrasadosComponent;
  let fixture: ComponentFixture<TabelaPagamentosAtrasadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaPagamentosAtrasadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaPagamentosAtrasadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
