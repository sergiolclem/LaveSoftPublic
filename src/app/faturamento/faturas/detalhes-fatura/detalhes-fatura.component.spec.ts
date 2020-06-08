import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesFaturaComponent } from './detalhes-fatura.component';

describe('DetalhesFaturaComponent', () => {
  let component: DetalhesFaturaComponent;
  let fixture: ComponentFixture<DetalhesFaturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesFaturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesFaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
