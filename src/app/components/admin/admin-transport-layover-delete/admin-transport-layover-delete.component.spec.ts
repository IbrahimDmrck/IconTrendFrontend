import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTransportLayoverDeleteComponent } from './admin-transport-layover-delete.component';

describe('AdminTransportLayoverDeleteComponent', () => {
  let component: AdminTransportLayoverDeleteComponent;
  let fixture: ComponentFixture<AdminTransportLayoverDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTransportLayoverDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTransportLayoverDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
