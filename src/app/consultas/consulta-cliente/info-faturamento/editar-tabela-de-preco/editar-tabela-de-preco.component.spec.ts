import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTabelaDePrecoComponent } from './editar-tabela-de-preco.component';

describe('EditarTabelaDePrecoComponent', () => {
  let component: EditarTabelaDePrecoComponent;
  let fixture: ComponentFixture<EditarTabelaDePrecoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTabelaDePrecoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTabelaDePrecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
