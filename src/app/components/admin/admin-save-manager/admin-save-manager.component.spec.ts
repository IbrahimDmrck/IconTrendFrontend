import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSaveManagerComponent } from './admin-save-manager.component';

describe('AdminSaveManagerComponent', () => {
  let component: AdminSaveManagerComponent;
  let fixture: ComponentFixture<AdminSaveManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSaveManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSaveManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
