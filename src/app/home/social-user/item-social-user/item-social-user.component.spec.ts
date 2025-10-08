import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSocialUserComponent } from './item-social-user.component';

describe('ItemSocialUserComponent', () => {
  let component: ItemSocialUserComponent;
  let fixture: ComponentFixture<ItemSocialUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSocialUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSocialUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
