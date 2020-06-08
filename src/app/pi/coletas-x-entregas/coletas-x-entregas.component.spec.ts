import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColetasXEntregasComponent } from './coletas-x-entregas.component';

describe('ColetasXEntregasComponent', () => {
  let component: ColetasXEntregasComponent;
  let fixture: ComponentFixture<ColetasXEntregasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColetasXEntregasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColetasXEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
