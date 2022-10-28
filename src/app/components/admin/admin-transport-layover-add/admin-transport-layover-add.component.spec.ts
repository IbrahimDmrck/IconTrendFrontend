import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTransportLayoverAddComponent } from './admin-transport-layover-add.component';

describe('AdminTransportLayoverAddComponent', () => {
  let component: AdminTransportLayoverAddComponent;
  let fixture: ComponentFixture<AdminTransportLayoverAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTransportLayoverAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTransportLayoverAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
