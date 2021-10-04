import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoGroupComponent } from './two-group.component';

describe('TwoGroupComponent', () => {
  let component: TwoGroupComponent;
  let fixture: ComponentFixture<TwoGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwoGroupComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
