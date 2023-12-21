import { TestBed } from '@angular/core/testing';

import { OrdersDbService } from './orders-db.service';

describe('OrdersDbService', () => {
  let service: OrdersDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
