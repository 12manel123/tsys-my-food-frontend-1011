import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendOrderComponent } from './send-order.component';

describe('SendOrderComponent', () => {
  let component: SendOrderComponent;
  let fixture: ComponentFixture<SendOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
