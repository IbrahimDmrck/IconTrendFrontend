import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScienceBoardDeleteComponent } from './admin-science-board-delete.component';

describe('AdminScienceBoardDeleteComponent', () => {
  let component: AdminScienceBoardDeleteComponent;
  let fixture: ComponentFixture<AdminScienceBoardDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminScienceBoardDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminScienceBoardDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
