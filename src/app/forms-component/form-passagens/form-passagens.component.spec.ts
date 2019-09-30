import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPassagensComponent } from './form-passagens.component';

describe('FormPassagensComponent', () => {
  let component: FormPassagensComponent;
  let fixture: ComponentFixture<FormPassagensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPassagensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPassagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
