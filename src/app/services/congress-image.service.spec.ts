import { TestBed } from '@angular/core/testing';

import { CongressImageService } from './congress-image.service';

describe('CongressImageService', () => {
  let service: CongressImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CongressImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
