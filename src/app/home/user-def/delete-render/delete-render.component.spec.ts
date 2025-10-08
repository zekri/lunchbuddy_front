import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRenderComponent } from './delete-render.component';

describe('DeleteRenderComponent', () => {
  let component: DeleteRenderComponent;
  let fixture: ComponentFixture<DeleteRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
