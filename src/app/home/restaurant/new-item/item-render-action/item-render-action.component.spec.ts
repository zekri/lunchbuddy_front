import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRenderActionComponent } from './item-render-action.component';

describe('ItemRenderActionComponent', () => {
  let component: ItemRenderActionComponent;
  let fixture: ComponentFixture<ItemRenderActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemRenderActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRenderActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
