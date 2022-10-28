import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScienceBoardAddComponent } from './admin-science-board-add.component';

describe('AdminScienceBoardAddComponent', () => {
  let component: AdminScienceBoardAddComponent;
  let fixture: ComponentFixture<AdminScienceBoardAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminScienceBoardAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminScienceBoardAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
