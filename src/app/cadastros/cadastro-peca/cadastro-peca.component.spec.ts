import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPecaComponent } from './cadastro-peca.component';

describe('CadastroPecaComponent', () => {
  let component: CadastroPecaComponent;
  let fixture: ComponentFixture<CadastroPecaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroPecaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroPecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
