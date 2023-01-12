import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGeneralInformationManagerComponent } from './admin-general-information-manager.component';

describe('AdminGeneralInformationManagerComponent', () => {
  let component: AdminGeneralInformationManagerComponent;
  let fixture: ComponentFixture<AdminGeneralInformationManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGeneralInformationManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGeneralInformationManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
