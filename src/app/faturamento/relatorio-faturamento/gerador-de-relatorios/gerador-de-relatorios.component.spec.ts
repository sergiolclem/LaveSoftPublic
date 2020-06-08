import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeradorDeRelatoriosComponent } from './gerador-de-relatorios.component';

describe('GeradorDeRelatoriosComponent', () => {
  let component: GeradorDeRelatoriosComponent;
  let fixture: ComponentFixture<GeradorDeRelatoriosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeradorDeRelatoriosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeradorDeRelatoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
