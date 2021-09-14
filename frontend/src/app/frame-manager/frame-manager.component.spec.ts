import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FrameManagerComponent} from './frame-manager.component';

describe('FrameManagerComponent', () => {
  let component: FrameManagerComponent;
  let fixture: ComponentFixture<FrameManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FrameManagerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
