import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroPecaClienteDataComponent } from './filtro-peca-cliente-data.component';

describe('FiltrosMovimentacoesComponent', () => {
  let component: FiltroPecaClienteDataComponent;
  let fixture: ComponentFixture<FiltroPecaClienteDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroPecaClienteDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroPecaClienteDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
