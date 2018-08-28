import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotManageComponent } from './spot-manage.component';

describe('SpotManageComponent', () => {
  let component: SpotManageComponent;
  let fixture: ComponentFixture<SpotManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
