import { TestBed } from '@angular/core/testing';

import { TransportLayoverDetailsService } from './transport-layover-details.service';

describe('TransportLayoverDetailsService', () => {
  let service: TransportLayoverDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportLayoverDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
