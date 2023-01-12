import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGeneralInformationAddComponent } from './admin-general-information-add.component';

describe('AdminGeneralInformationAddComponent', () => {
  let component: AdminGeneralInformationAddComponent;
  let fixture: ComponentFixture<AdminGeneralInformationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGeneralInformationAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGeneralInformationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
