import { TestBed } from '@angular/core/testing';

import { TransportLayoverImageService } from './transport-layover-image.service';

describe('TransportLayoverImageService', () => {
  let service: TransportLayoverImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportLayoverImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
