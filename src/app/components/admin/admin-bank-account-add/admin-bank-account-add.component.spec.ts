import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBankAccountAddComponent } from './admin-bank-account-add.component';

describe('AdminBankAccountAddComponent', () => {
  let component: AdminBankAccountAddComponent;
  let fixture: ComponentFixture<AdminBankAccountAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBankAccountAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBankAccountAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
