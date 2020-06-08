import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliarFaturamentoComponent } from './auxiliar-faturamento.component';

describe('AuxiliarFaturamentoComponent', () => {
  let component: AuxiliarFaturamentoComponent;
  let fixture: ComponentFixture<AuxiliarFaturamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuxiliarFaturamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxiliarFaturamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
