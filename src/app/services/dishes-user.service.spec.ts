import { TestBed } from '@angular/core/testing';

import { DishesUserService } from './dishes-user.service';

describe('DishesUserService', () => {
  let service: DishesUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishesUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
