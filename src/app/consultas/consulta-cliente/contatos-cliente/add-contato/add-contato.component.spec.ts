import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContatoComponent } from './add-contato.component';

describe('AddContatoComponent', () => {
  let component: AddContatoComponent;
  let fixture: ComponentFixture<AddContatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
