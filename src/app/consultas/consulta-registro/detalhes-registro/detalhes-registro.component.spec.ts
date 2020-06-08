import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesRegistroComponent } from './detalhes-registro.component';

describe('DetalhesRegistroComponent', () => {
  let component: DetalhesRegistroComponent;
  let fixture: ComponentFixture<DetalhesRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
