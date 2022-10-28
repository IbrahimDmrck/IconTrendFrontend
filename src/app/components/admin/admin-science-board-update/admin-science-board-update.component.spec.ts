import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScienceBoardUpdateComponent } from './admin-science-board-update.component';

describe('AdminScienceBoardUpdateComponent', () => {
  let component: AdminScienceBoardUpdateComponent;
  let fixture: ComponentFixture<AdminScienceBoardUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminScienceBoardUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminScienceBoardUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
