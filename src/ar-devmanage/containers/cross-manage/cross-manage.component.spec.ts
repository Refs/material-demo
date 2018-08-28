import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossManageComponent } from './cross-manage.component';

describe('CrossManageComponent', () => {
  let component: CrossManageComponent;
  let fixture: ComponentFixture<CrossManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrossManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
