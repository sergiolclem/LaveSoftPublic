import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoXClienteComponent } from './servico-x-cliente.component';

describe('ServicoXClienteComponent', () => {
  let component: ServicoXClienteComponent;
  let fixture: ComponentFixture<ServicoXClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicoXClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicoXClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
