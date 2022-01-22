import { TestBed } from '@angular/core/testing';

import { OnlineFriendsService } from './onlineFriends.service';

describe('ChatService', () => {
  let service: OnlineFriendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineFriendsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
