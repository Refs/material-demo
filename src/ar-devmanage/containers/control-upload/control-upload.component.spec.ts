import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlUploadComponent } from './control-upload.component';

describe('ControlUploadComponent', () => {
  let component: ControlUploadComponent;
  let fixture: ComponentFixture<ControlUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
