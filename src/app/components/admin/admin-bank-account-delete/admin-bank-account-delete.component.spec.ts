import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBankAccountDeleteComponent } from './admin-bank-account-delete.component';

describe('AdminBankAccountDeleteComponent', () => {
  let component: AdminBankAccountDeleteComponent;
  let fixture: ComponentFixture<AdminBankAccountDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBankAccountDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBankAccountDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
