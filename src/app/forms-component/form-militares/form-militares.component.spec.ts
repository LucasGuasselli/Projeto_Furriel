import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMilitaresComponent } from './form-militares.component';

describe('FormMilitaresComponent', () => {
  let component: FormMilitaresComponent;
  let fixture: ComponentFixture<FormMilitaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMilitaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMilitaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
