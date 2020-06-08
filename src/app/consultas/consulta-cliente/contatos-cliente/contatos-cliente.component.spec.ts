import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatosClienteComponent } from './contatos-cliente.component';

describe('ContatosClienteComponent', () => {
  let component: ContatosClienteComponent;
  let fixture: ComponentFixture<ContatosClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContatosClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
