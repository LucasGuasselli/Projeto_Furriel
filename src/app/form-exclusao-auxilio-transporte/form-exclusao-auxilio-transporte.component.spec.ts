import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormExclusaoAuxilioTransporteComponent } from './form-exclusao-auxilio-transporte.component';

describe('FormExclusaoAuxilioTransporteComponent', () => {
  let component: FormExclusaoAuxilioTransporteComponent;
  let fixture: ComponentFixture<FormExclusaoAuxilioTransporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormExclusaoAuxilioTransporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormExclusaoAuxilioTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
