import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProcessoComponent } from './info-processo.component';

describe('InfoProcessoComponent', () => {
  let component: InfoProcessoComponent;
  let fixture: ComponentFixture<InfoProcessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoProcessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
