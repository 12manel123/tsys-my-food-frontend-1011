import { TestBed } from '@angular/core/testing';

import { DishesDbService } from './dishes-db.service';

describe('DishesDbService', () => {
  let service: DishesDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishesDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
