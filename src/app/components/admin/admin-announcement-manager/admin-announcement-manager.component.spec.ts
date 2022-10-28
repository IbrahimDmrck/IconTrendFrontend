import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnnouncementManagerComponent } from './admin-announcement-manager.component';

describe('AdminAnnouncementManagerComponent', () => {
  let component: AdminAnnouncementManagerComponent;
  let fixture: ComponentFixture<AdminAnnouncementManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAnnouncementManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAnnouncementManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
