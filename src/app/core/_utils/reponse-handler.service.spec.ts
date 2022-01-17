import { TestBed } from '@angular/core/testing';

import { ResponseHandlerService } from './response-handler.service';

describe('ReponseHandlerService', () => {
  let service: ResponseHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
