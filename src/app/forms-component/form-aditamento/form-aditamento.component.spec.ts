import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAditamentoComponent } from './form-aditamento.component';

describe('FormAditamentoComponent', () => {
  let component: FormAditamentoComponent;
  let fixture: ComponentFixture<FormAditamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAditamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAditamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
