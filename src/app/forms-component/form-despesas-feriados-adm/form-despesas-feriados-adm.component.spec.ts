import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDespesasFeriadosAdmComponent } from './form-despesas-feriados-adm.component';

describe('FormDescontosFeriadosAdmComponent', () => {
  let component: FormDespesasFeriadosAdmComponent;
  let fixture: ComponentFixture<FormDespesasFeriadosAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDespesasFeriadosAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDespesasFeriadosAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
