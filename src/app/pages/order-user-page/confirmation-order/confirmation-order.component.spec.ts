import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationOrderComponent } from './confirmation-order.component';

describe('ConfirmationOrderComponent', () => {
  let component: ConfirmationOrderComponent;
  let fixture: ComponentFixture<ConfirmationOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmationOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
