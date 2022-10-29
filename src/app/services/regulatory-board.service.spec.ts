import { TestBed } from '@angular/core/testing';

import { RegulatoryBoardService } from './regulatory-board.service';

describe('RegulatoryBoardService', () => {
  let service: RegulatoryBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegulatoryBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
