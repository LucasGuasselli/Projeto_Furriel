import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSaqueAtrasadoComponent } from './form-saque-atrasado.component';

describe('FormSaqueAtrasadoComponent', () => {
  let component: FormSaqueAtrasadoComponent;
  let fixture: ComponentFixture<FormSaqueAtrasadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSaqueAtrasadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSaqueAtrasadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
