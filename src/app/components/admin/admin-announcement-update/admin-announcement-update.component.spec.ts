import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnnouncementUpdateComponent } from './admin-announcement-update.component';

describe('AdminAnnouncementUpdateComponent', () => {
  let component: AdminAnnouncementUpdateComponent;
  let fixture: ComponentFixture<AdminAnnouncementUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAnnouncementUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAnnouncementUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
