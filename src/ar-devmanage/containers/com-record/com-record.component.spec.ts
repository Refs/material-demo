import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComRecordComponent } from './com-record.component';

describe('ComRecordComponent', () => {
  let component: ComRecordComponent;
  let fixture: ComponentFixture<ComRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
