import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCondicaoDePagamentoComponent } from './editar-condicao-de-pagamento.component';

describe('EditarCondicaoDePagamentoComponent', () => {
  let component: EditarCondicaoDePagamentoComponent;
  let fixture: ComponentFixture<EditarCondicaoDePagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCondicaoDePagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCondicaoDePagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
