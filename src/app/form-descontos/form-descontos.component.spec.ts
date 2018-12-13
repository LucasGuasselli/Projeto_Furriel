import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDescontosComponent } from './form-descontos.component';

describe('FormDescontosComponent', () => {
  let component: FormDescontosComponent;
  let fixture: ComponentFixture<FormDescontosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDescontosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDescontosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
