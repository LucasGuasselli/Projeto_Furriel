import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaValoresPassagensComponent } from './tabela-passagens.component';

describe('TabelaValoresPassagensComponent', () => {
  let component: TabelaValoresPassagensComponent;
  let fixture: ComponentFixture<TabelaValoresPassagensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaValoresPassagensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaValoresPassagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
