import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGeneralInformationUpdateComponent } from './admin-general-information-update.component';

describe('AdminGeneralInformationUpdateComponent', () => {
  let component: AdminGeneralInformationUpdateComponent;
  let fixture: ComponentFixture<AdminGeneralInformationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGeneralInformationUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGeneralInformationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
