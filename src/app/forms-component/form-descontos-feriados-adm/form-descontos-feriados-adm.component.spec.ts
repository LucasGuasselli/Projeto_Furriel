import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDescontosFeriadosAdmComponent } from './form-descontos-feriados-adm.component';

describe('FormDescontosFeriadosAdmComponent', () => {
  let component: FormDescontosFeriadosAdmComponent;
  let fixture: ComponentFixture<FormDescontosFeriadosAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDescontosFeriadosAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDescontosFeriadosAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
