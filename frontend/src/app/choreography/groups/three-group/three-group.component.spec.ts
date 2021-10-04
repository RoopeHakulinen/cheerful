import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeGroupComponent } from './three-group.component';

describe('ThreeGroupComponent', () => {
  let component: ThreeGroupComponent;
  let fixture: ComponentFixture<ThreeGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThreeGroupComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
