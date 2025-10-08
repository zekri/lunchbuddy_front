import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDefComponent } from './user-def.component';

describe('UserDefComponent', () => {
  let component: UserDefComponent;
  let fixture: ComponentFixture<UserDefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
