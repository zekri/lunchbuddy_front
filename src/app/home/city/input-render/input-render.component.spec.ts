import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRenderComponent } from './input-render.component';

describe('InputRenderComponent', () => {
  let component: InputRenderComponent;
  let fixture: ComponentFixture<InputRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
