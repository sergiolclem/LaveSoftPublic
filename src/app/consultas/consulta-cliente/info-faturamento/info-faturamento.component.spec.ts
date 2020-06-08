import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFaturamentoComponent } from './info-faturamento.component';

describe('InfoFaturamentoComponent', () => {
  let component: InfoFaturamentoComponent;
  let fixture: ComponentFixture<InfoFaturamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoFaturamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoFaturamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
