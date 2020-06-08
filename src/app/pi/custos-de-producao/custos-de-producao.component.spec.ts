import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustosDeProducaoComponent } from './custos-de-producao.component';

describe('CustosDeProducaoComponent', () => {
  let component: CustosDeProducaoComponent;
  let fixture: ComponentFixture<CustosDeProducaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustosDeProducaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustosDeProducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
