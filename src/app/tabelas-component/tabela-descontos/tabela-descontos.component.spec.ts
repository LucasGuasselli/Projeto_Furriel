import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaDescontosComponent } from './tabela-descontos.component';

describe('TabelaDescontosComponent', () => {
  let component: TabelaDescontosComponent;
  let fixture: ComponentFixture<TabelaDescontosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaDescontosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaDescontosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
