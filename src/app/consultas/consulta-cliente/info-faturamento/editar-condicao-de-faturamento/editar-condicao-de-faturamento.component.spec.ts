import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCondicaoDeFaturamentoComponent } from './editar-condicao-de-faturamento.component';

describe('EditarCondicaoDeFaturamentoComponent', () => {
  let component: EditarCondicaoDeFaturamentoComponent;
  let fixture: ComponentFixture<EditarCondicaoDeFaturamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCondicaoDeFaturamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCondicaoDeFaturamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
