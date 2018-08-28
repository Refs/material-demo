import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadManageComponent } from './road-manage.component';

describe('RoadManageComponent', () => {
  let component: RoadManageComponent;
  let fixture: ComponentFixture<RoadManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
