import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGeneralInformationDeleteComponent } from './admin-general-information-delete.component';

describe('AdminGeneralInformationDeleteComponent', () => {
  let component: AdminGeneralInformationDeleteComponent;
  let fixture: ComponentFixture<AdminGeneralInformationDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGeneralInformationDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGeneralInformationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
