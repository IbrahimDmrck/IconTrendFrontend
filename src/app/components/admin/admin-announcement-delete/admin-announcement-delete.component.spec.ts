import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnnouncementDeleteComponent } from './admin-announcement-delete.component';

describe('AdminAnnouncementDeleteComponent', () => {
  let component: AdminAnnouncementDeleteComponent;
  let fixture: ComponentFixture<AdminAnnouncementDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAnnouncementDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAnnouncementDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
