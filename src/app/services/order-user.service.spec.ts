import { TestBed } from '@angular/core/testing';

import { OrderUserService } from './order-user.service';

describe('OrderUserService', () => {
  let service: OrderUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
