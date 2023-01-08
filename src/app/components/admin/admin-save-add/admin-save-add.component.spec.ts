import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSaveAddComponent } from './admin-save-add.component';

describe('AdminSaveAddComponent', () => {
  let component: AdminSaveAddComponent;
  let fixture: ComponentFixture<AdminSaveAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSaveAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSaveAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
