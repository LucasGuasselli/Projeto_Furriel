import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDespesaGuarnicaoServicoComponent } from './form-despesa-guarnicao-servico.component';

describe('FormDescontoGuarnicaoServicoComponent', () => {
  let component: FormDespesaGuarnicaoServicoComponent;
  let fixture: ComponentFixture<FormDespesaGuarnicaoServicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDespesaGuarnicaoServicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDespesaGuarnicaoServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
