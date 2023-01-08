import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBankAccountUpdateComponent } from './admin-bank-account-update.component';

describe('AdminBankAccountUpdateComponent', () => {
  let component: AdminBankAccountUpdateComponent;
  let fixture: ComponentFixture<AdminBankAccountUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBankAccountUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBankAccountUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
