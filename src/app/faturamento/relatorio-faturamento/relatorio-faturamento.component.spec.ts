import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioFaturamentoComponent } from './relatorio-faturamento.component';

describe('RelatorioFaturamentoComponent', () => {
  let component: RelatorioFaturamentoComponent;
  let fixture: ComponentFixture<RelatorioFaturamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioFaturamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioFaturamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
