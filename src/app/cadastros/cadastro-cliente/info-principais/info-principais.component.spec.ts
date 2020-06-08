import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPrincipaisComponent } from './info-principais.component';

describe('InfoPrincipaisComponent', () => {
  let component: InfoPrincipaisComponent;
  let fixture: ComponentFixture<InfoPrincipaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPrincipaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPrincipaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
