import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScienceBoardManagerComponent } from './admin-science-board-manager.component';

describe('AdminScienceBoardManagerComponent', () => {
  let component: AdminScienceBoardManagerComponent;
  let fixture: ComponentFixture<AdminScienceBoardManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminScienceBoardManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminScienceBoardManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
