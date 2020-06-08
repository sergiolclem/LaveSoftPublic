import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeRegistrosComponent } from './lista-de-registros.component';

describe('ListaDeRegistrosComponent', () => {
  let component: ListaDeRegistrosComponent;
  let fixture: ComponentFixture<ListaDeRegistrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDeRegistrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
