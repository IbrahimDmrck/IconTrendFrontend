import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrBankAccountUpdateComponent } from './admin-tr-bank-account-update.component';

describe('AdminTrBankAccountUpdateComponent', () => {
  let component: AdminTrBankAccountUpdateComponent;
  let fixture: ComponentFixture<AdminTrBankAccountUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTrBankAccountUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTrBankAccountUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
