import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulatoryBoardComponent } from './regulatory-board.component';

describe('RegulatoryBoardComponent', () => {
  let component: RegulatoryBoardComponent;
  let fixture: ComponentFixture<RegulatoryBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegulatoryBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegulatoryBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
