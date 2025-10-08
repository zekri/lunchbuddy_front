import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderDeleteComponent } from './render-delete.component';

describe('RenderDeleteComponent', () => {
  let component: RenderDeleteComponent;
  let fixture: ComponentFixture<RenderDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
