import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSaveUpdateComponent } from './admin-save-update.component';

describe('AdminSaveUpdateComponent', () => {
  let component: AdminSaveUpdateComponent;
  let fixture: ComponentFixture<AdminSaveUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSaveUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSaveUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
