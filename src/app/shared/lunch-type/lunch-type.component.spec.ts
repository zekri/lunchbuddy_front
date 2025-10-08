import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchTypeComponent } from './lunch-type.component';

describe('LunchTypeComponent', () => {
  let component: LunchTypeComponent;
  let fixture: ComponentFixture<LunchTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LunchTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LunchTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
