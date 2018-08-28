import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceManageComponent } from './interface-manage.component';

describe('InterfaceManageComponent', () => {
  let component: InterfaceManageComponent;
  let fixture: ComponentFixture<InterfaceManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterfaceManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
