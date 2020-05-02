import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaDespesasAAnularComponent } from './tabela-despesas-a-anular.component';

describe('TabelaDescontosComponent', () => {
  let component: TabelaDespesasAAnularComponent;
  let fixture: ComponentFixture<TabelaDespesasAAnularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaDespesasAAnularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaDespesasAAnularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
