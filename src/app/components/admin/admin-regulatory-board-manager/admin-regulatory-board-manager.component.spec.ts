import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegulatoryBoardManagerComponent } from './admin-regulatory-board-manager.component';

describe('AdminRegulatoryBoardManagerComponent', () => {
  let component: AdminRegulatoryBoardManagerComponent;
  let fixture: ComponentFixture<AdminRegulatoryBoardManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegulatoryBoardManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRegulatoryBoardManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
