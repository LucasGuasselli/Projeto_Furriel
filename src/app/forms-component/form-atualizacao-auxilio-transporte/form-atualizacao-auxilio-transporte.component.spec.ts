import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAtualizacaoAuxilioTransporteComponent } from './form-atualizacao-auxilio-transporte.component';

describe('FormAtualizacaoAuxilioTransporteComponent', () => {
  let component: FormAtualizacaoAuxilioTransporteComponent;
  let fixture: ComponentFixture<FormAtualizacaoAuxilioTransporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAtualizacaoAuxilioTransporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAtualizacaoAuxilioTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
