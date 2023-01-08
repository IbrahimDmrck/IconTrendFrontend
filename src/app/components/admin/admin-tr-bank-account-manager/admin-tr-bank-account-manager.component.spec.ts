import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrBankAccountManagerComponent } from './admin-tr-bank-account-manager.component';

describe('AdminTrBankAccountManagerComponent', () => {
  let component: AdminTrBankAccountManagerComponent;
  let fixture: ComponentFixture<AdminTrBankAccountManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTrBankAccountManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTrBankAccountManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
