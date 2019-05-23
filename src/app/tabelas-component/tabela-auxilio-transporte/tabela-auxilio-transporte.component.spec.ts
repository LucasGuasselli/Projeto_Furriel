import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaAuxilioTransporteComponent } from './tabela-auxilio-transporte.component';

describe('TabelaAuxilioTransporteComponent', () => {
  let component: TabelaAuxilioTransporteComponent;
  let fixture: ComponentFixture<TabelaAuxilioTransporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaAuxilioTransporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaAuxilioTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
