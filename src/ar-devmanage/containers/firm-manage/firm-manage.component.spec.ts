import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmManageComponent } from './firm-manage.component';

describe('FirmManageComponent', () => {
  let component: FirmManageComponent;
  let fixture: ComponentFixture<FirmManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
