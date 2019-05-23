import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaAditamentosComponent } from './tabela-aditamentos.component';

describe('TabelaAditamentosComponent', () => {
  let component: TabelaAditamentosComponent;
  let fixture: ComponentFixture<TabelaAditamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaAditamentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaAditamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
