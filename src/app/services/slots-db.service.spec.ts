import { TestBed } from '@angular/core/testing';

import { SlotsDbService } from './slots-db.service';

describe('SlotsDbService', () => {
  let service: SlotsDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotsDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
