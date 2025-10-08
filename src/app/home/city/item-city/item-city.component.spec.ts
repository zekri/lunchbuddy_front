import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCityComponent } from './item-city.component';

describe('ItemCityComponent', () => {
  let component: ItemCityComponent;
  let fixture: ComponentFixture<ItemCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
