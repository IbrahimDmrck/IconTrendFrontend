import { TestBed } from '@angular/core/testing';

import { CongressDetailsService } from './congress-details.service';

describe('CongressDetailsService', () => {
  let service: CongressDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CongressDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
