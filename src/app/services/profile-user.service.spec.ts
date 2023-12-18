import { TestBed } from '@angular/core/testing';

import { ProfileUserService } from './profile-user.service';

describe('ProfileUserService', () => {
  let service: ProfileUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
