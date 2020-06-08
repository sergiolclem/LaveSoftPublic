import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesRegistroDeClienteComponent } from './detalhes-registro-de-cliente.component';

describe('DetalhesRegistroComponent', () => {
  let component: DetalhesRegistroDeClienteComponent;
  let fixture: ComponentFixture<DetalhesRegistroDeClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesRegistroDeClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesRegistroDeClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
