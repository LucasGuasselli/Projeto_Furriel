import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaMilitaresComponent } from './tabela-militares.component';

describe('TabelaMilitaresComponent', () => {
  let component: TabelaMilitaresComponent;
  let fixture: ComponentFixture<TabelaMilitaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaMilitaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaMilitaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
