import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAuxilioTransporteComponent } from './form-auxilio-transporte.component';

describe('FormAuxilioTransporteComponent', () => {
  let component: FormAuxilioTransporteComponent;
  let fixture: ComponentFixture<FormAuxilioTransporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAuxilioTransporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAuxilioTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
