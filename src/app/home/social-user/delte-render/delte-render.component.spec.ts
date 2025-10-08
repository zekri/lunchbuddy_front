import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelteRenderComponent } from './delte-render.component';

describe('DelteRenderComponent', () => {
  let component: DelteRenderComponent;
  let fixture: ComponentFixture<DelteRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelteRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelteRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
