import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaTabelaDePrecoComponent } from './consulta-tabela-de-preco.component';

describe('ConsultaTabelaDePrecoComponent', () => {
  let component: ConsultaTabelaDePrecoComponent;
  let fixture: ComponentFixture<ConsultaTabelaDePrecoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaTabelaDePrecoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaTabelaDePrecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
