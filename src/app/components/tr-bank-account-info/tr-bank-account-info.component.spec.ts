import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrBankAccountInfoComponent } from './tr-bank-account-info.component';

describe('TrBankAccountInfoComponent', () => {
  let component: TrBankAccountInfoComponent;
  let fixture: ComponentFixture<TrBankAccountInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrBankAccountInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrBankAccountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
