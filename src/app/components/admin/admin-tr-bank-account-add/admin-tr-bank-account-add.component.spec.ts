import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrBankAccountAddComponent } from './admin-tr-bank-account-add.component';

describe('AdminTrBankAccountAddComponent', () => {
  let component: AdminTrBankAccountAddComponent;
  let fixture: ComponentFixture<AdminTrBankAccountAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTrBankAccountAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTrBankAccountAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
