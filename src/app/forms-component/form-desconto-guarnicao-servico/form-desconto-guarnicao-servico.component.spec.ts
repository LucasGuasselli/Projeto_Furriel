import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDescontoGuarnicaoServicoComponent } from './form-desconto-guarnicao-servico.component';

describe('FormDescontoGuarnicaoServicoComponent', () => {
  let component: FormDescontoGuarnicaoServicoComponent;
  let fixture: ComponentFixture<FormDescontoGuarnicaoServicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDescontoGuarnicaoServicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDescontoGuarnicaoServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
