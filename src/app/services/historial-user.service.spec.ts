import { TestBed } from '@angular/core/testing';

import { HistorialUserService } from './historial-user.service';

describe('HistorialUserService', () => {
  let service: HistorialUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
