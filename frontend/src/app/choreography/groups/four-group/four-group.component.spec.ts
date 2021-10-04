import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourGroupComponent } from './four-group.component';

describe('FourGroupComponent', () => {
  let component: FourGroupComponent;
  let fixture: ComponentFixture<FourGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FourGroupComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FourGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
