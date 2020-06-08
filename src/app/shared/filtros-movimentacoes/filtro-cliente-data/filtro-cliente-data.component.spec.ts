import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroClienteDataComponent } from './filtro-cliente-data.component';

describe('FiltroClienteDataComponent', () => {
  let component: FiltroClienteDataComponent;
  let fixture: ComponentFixture<FiltroClienteDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroClienteDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroClienteDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
