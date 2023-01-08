import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBankAccountManagerComponent } from './admin-bank-account-manager.component';

describe('AdminBankAccountManagerComponent', () => {
  let component: AdminBankAccountManagerComponent;
  let fixture: ComponentFixture<AdminBankAccountManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBankAccountManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBankAccountManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
