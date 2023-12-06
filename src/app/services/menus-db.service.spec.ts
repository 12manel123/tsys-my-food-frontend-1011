import { TestBed } from '@angular/core/testing';

import { MenusDbService } from './menus-db.service';

describe('MenusDbService', () => {
  let service: MenusDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenusDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
