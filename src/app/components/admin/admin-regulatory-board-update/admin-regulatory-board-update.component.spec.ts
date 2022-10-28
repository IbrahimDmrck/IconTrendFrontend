import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegulatoryBoardUpdateComponent } from './admin-regulatory-board-update.component';

describe('AdminRegulatoryBoardUpdateComponent', () => {
  let component: AdminRegulatoryBoardUpdateComponent;
  let fixture: ComponentFixture<AdminRegulatoryBoardUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegulatoryBoardUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRegulatoryBoardUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
