import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrBankAccountDeleteComponent } from './admin-tr-bank-account-delete.component';

describe('AdminTrBankAccountDeleteComponent', () => {
  let component: AdminTrBankAccountDeleteComponent;
  let fixture: ComponentFixture<AdminTrBankAccountDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTrBankAccountDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTrBankAccountDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
