import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDespesasComponent } from './form-despesas.component';

describe('FormDescontosComponent', () => {
  let component: FormDespesasComponent;
  let fixture: ComponentFixture<FormDespesasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDespesasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDespesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
