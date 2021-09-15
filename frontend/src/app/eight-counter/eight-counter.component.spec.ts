import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EightCounterComponent } from './eight-counter.component';

describe('EightCounterComponent', () => {
  let component: EightCounterComponent;
  let fixture: ComponentFixture<EightCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EightCounterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EightCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
