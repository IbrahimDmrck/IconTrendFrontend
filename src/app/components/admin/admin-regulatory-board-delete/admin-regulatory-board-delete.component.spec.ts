import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegulatoryBoardDeleteComponent } from './admin-regulatory-board-delete.component';

describe('AdminRegulatoryBoardDeleteComponent', () => {
  let component: AdminRegulatoryBoardDeleteComponent;
  let fixture: ComponentFixture<AdminRegulatoryBoardDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegulatoryBoardDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRegulatoryBoardDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
