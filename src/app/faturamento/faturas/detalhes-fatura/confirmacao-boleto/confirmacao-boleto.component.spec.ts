import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacaoBoletoComponent } from './confirmacao-boleto.component';

describe('ConfirmacaoBoletoComponent', () => {
  let component: ConfirmacaoBoletoComponent;
  let fixture: ComponentFixture<ConfirmacaoBoletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacaoBoletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacaoBoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
