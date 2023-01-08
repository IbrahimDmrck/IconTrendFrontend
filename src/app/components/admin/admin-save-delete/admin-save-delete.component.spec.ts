import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSaveDeleteComponent } from './admin-save-delete.component';

describe('AdminSaveDeleteComponent', () => {
  let component: AdminSaveDeleteComponent;
  let fixture: ComponentFixture<AdminSaveDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSaveDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSaveDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
