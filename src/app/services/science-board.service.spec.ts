import { TestBed } from '@angular/core/testing';

import { ScienceBoardService } from './science-board.service';

describe('ScienceBoardService', () => {
  let service: ScienceBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScienceBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
