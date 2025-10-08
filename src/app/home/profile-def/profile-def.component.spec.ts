import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDefComponent } from './profile-def.component';

describe('ProfileDefComponent', () => {
  let component: ProfileDefComponent;
  let fixture: ComponentFixture<ProfileDefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
