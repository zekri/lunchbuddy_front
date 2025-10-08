import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionRenderItemComponent } from './action-render-item.component';

describe('ActionRenderItemComponent', () => {
  let component: ActionRenderItemComponent;
  let fixture: ComponentFixture<ActionRenderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionRenderItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionRenderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
