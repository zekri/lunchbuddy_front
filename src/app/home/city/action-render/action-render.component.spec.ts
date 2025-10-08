import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionRenderComponent } from './action-render.component';

describe('ActionRenderComponent', () => {
  let component: ActionRenderComponent;
  let fixture: ComponentFixture<ActionRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
