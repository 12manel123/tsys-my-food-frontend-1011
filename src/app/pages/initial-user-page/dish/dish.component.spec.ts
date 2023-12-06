import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishComponent } from './dish.component';

describe('DishComponent', () => {
  let component: DishComponent;
  let fixture: ComponentFixture<DishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
