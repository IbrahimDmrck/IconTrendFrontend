import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegulatoryBoardAddComponent } from './admin-regulatory-board-add.component';

describe('AdminRegulatoryBoardAddComponent', () => {
  let component: AdminRegulatoryBoardAddComponent;
  let fixture: ComponentFixture<AdminRegulatoryBoardAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegulatoryBoardAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRegulatoryBoardAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
