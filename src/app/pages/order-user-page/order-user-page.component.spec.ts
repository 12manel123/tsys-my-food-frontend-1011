import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUserPageComponent } from './order-user-page.component';

describe('OrderUserPageComponent', () => {
  let component: OrderUserPageComponent;
  let fixture: ComponentFixture<OrderUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderUserPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
