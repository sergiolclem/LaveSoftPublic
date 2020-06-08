import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesDoRelatorioComponent } from './detalhes-do-relatorio.component';

describe('DetalhesDoRelatorioComponent', () => {
  let component: DetalhesDoRelatorioComponent;
  let fixture: ComponentFixture<DetalhesDoRelatorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesDoRelatorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesDoRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
