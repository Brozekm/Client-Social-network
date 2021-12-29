import { TestBed } from '@angular/core/testing';

import { TmpUsersService } from './tmp-users.service';

describe('TmpUsersService', () => {
  let service: TmpUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmpUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
