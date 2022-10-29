import { TestBed } from '@angular/core/testing';

import { TransportLayoverService } from './transport-layover.service';

describe('TransportLayoverService', () => {
  let service: TransportLayoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportLayoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
