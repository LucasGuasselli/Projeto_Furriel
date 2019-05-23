import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPagamentoAtrasadoComponent } from './form-pagamento-atrasado.component';

describe('FormPagamentoAtrasadoComponent', () => {
  let component: FormPagamentoAtrasadoComponent;
  let fixture: ComponentFixture<FormPagamentoAtrasadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPagamentoAtrasadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPagamentoAtrasadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
