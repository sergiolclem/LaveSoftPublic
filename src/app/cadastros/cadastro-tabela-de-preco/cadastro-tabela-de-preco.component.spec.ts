import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroTabelaDePrecoComponent } from './cadastro-tabela-de-preco.component';

describe('CadastroTabelaDePrecoComponent', () => {
  let component: CadastroTabelaDePrecoComponent;
  let fixture: ComponentFixture<CadastroTabelaDePrecoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroTabelaDePrecoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroTabelaDePrecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
